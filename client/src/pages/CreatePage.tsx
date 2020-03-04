import React, { useState, useEffect, useContext } from "react";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";
import { useHistory } from "react-router-dom";

export const CreatePage: React.FC = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();

  const { request } = useHttp();
  const [link, setLink] = useState("");

  useEffect(() => {
    // window.M <-- from Materialize CSS
    // @ts-ignore
    window.M.updateTextFields();
  }, []);

  const generateLinkHandler = async () => {
    try {
      const data = await request(
        "/api/link/generate",
        "POST",
        JSON.stringify({ from: link }),
        [["Authorization", `Bearer ${auth.token}`]]
      );

      // Redirect to generated link inforamtion page
      history.push(`/detail/${data.link._id}`);
    } catch (e) {}
  };

  const pressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      generateLinkHandler();
    }
  };

  const onClickHandler = () => {
    generateLinkHandler();
  };

  return (
    <div className="row section">
      <div className="col s8 offset-s2">
        <div className="input-field">
          <input
            placeholder="Paste a link"
            id="link"
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            onKeyPress={pressHandler}
            className="custom-input"
          />
          <label htmlFor="password">Input link</label>
        </div>
      </div>
      <div className="col s8 offset-s2">
        <button
          className="waves-effect waves-light btn indigo darken-4"
          onClick={onClickHandler}
        >
          SHORT
        </button>
      </div>
    </div>
  );
};
