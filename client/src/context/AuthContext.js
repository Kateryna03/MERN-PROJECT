import { createContext } from "react";
//пустая ф-ция ктр ничего не делает
function noop() {}

export const AuthContext = createContext({
  token: null,
  userId: null,
  login: noop,
  logout: noop,
  isAuthenticated: false,
});
