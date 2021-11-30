import React from "react";

import { BrowserRouter as Router } from "react-router-dom";
import { useRoutes } from "./routes";
import { useAuth } from "./hooks/authHook";
import { Navbar } from "./components/Navbar";
import { Loader } from "./components/Loader";

import "materialize-css";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { login, logout, token, userId, ready } = useAuth();
  const isAuthenticated = !!token; //делаю булевым значением
  const routes = useRoutes(isAuthenticated);

  //если еще не успели определить авторизацию
  if (!ready) {
    return <Loader />;
  }
  return (
    <AuthContext.Provider
      value={{ login, logout, token, userId, isAuthenticated }}
    >
      <Router>
        {isAuthenticated && <Navbar />}
        <div className="container">{routes}</div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
