import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/httpHook";
import { useHistory } from "react-router-dom";

export const CreatePage = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  console.log("auth", auth);
  const { request } = useHttp();
  const [link, setLink] = useState("");

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const pressHandler = async (e) => {
    if (e.key === "Enter") {
      try {
        const data = await request(
          "/api/links/generate",
          "POST",
          { from: link },
          { Authorization: `Bearer ${auth.token}` }
        );
        // const data = await request(
        //   "/api/links/generate",
        //   "POST",
        //   {
        //     from: link,
        //   },
        //   { Authorization: `Bearer ${auth.token}` }
        // );
        console.log("data", data);

        history.push(`/details/${data.link._id}`);
      } catch (e) {}
    }
  };
  return (
    <div className="row">
      <div className="col s8 offset-s2" style={{ paddingTop: "2rem" }}>
        <div className="input-field ">
          <input
            placeholder="Input link"
            id="link"
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            onKeyPress={pressHandler}
          />
          <label htmlFor="email">Input link</label>
        </div>
      </div>
    </div>
  );
};
