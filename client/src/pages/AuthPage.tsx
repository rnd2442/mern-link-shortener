import React, { useState, useEffect, useContext } from "react";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";
import { AuthContext } from "../context/AuthContext";
import { StyledCard } from "../components/StyledCard";

export const AuthPage: React.FC = () => {
  const auth = useContext(AuthContext);

  const { loading, error, request, clearError } = useHttp();
  const message = useMessage();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect(() => {
    // window.M <-- from Materialize CSS. This required
    // for correct text input rendering after logout and etc
    // @ts-ignore
    window.M.updateTextFields();
  }, []);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const registerHandler = async () => {
    try {
      const data = await request(
        "/api/auth/register",
        "POST",
        JSON.stringify(form)
      );

      // Toast with a message
      message(data.message);
    } catch (e) {}
  };

  const loginHandler = async () => {
    try {
      const data = await request(
        "/api/auth/login",
        "POST",
        JSON.stringify(form)
      );

      auth.login(data.token, data.userId);
    } catch (e) {}
  };

  return (
    <div className="row section">
      <div className="col s6 offset-m3">
        <h1>Link shortener</h1>
        <StyledCard
          title={"Authorization"}
          actionPanel={
            <>
              <button
                className="sign-in btn indigo darken-4"
                disabled={loading}
                onClick={loginHandler}
              >
                Sign In
              </button>
              <button
                className="btn grey lighten-1 black-text"
                disabled={loading}
                onClick={registerHandler}
              >
                Sign Up
              </button>
            </>
          }
        >
          <div className="input-field">
            <input
              placeholder="Type email"
              id="email"
              type="email"
              name="email"
              className="validate custom-input"
              onChange={onChangeHandler}
              value={form.email}
            />
            <label htmlFor="email">email</label>

            <div className="input-field">
              <input
                placeholder="Type password"
                id="password"
                type="password"
                name="password"
                className="validate custom-input"
                onChange={onChangeHandler}
                value={form.password}
              />
              <label htmlFor="password">password</label>
            </div>
          </div>
        </StyledCard>
      </div>
    </div>
  );

  return (
    <div className="row">
      <div className="col s6 offset-m3">
        <h1>Link shortener</h1>
        <div className="card white  lighten-4">
          <div className="card-content ">
            <span className="card-title">Authorization</span>
            <div>
              <div className="input-field">
                <input
                  placeholder="Type email"
                  id="email"
                  type="email"
                  name="email"
                  className="validate custom-input"
                  onChange={onChangeHandler}
                  value={form.email}
                />
                <label htmlFor="email">email</label>

                <div className="input-field">
                  <input
                    placeholder="Type password"
                    id="password"
                    type="password"
                    name="password"
                    className="validate custom-input"
                    onChange={onChangeHandler}
                    value={form.password}
                  />
                  <label htmlFor="password">password</label>
                </div>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button
              className="sign-in btn indigo darken-4"
              disabled={loading}
              onClick={loginHandler}
            >
              Sign In
            </button>
            <button
              className="btn grey lighten-1 black-text"
              disabled={loading}
              onClick={registerHandler}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
