import React, { useContext, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const Navbar: React.FC = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);

  const logoutHandler = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    auth.logout();

    history.push("/");
  };

  let instance: any = null;
  useEffect(() => {
    // window.M <-- from Materialize CSS. This required
    // for correct text input rendering after logout and etc
    // @ts-ignore
    instance = window.M.Sidenav.init(document.querySelectorAll(".sidenav"), {
      draggable: true,
    });
  }, []);

  return (
    <>
      <nav>
        <div className="nav-wrapper">
          <span className="brand-logo">Link Shortener</span>
          <a href="#" data-target="mobile-demo" className="sidenav-trigger">
            <i className="material-icons">menu</i>
          </a>

          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <NavLink to="/create">Create</NavLink>
            </li>
            <li>
              <NavLink to="/links">Links</NavLink>
            </li>
            <li>
              <a href="/" onClick={logoutHandler}>
                Logout
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <ul className="sidenav" id="mobile-demo">
        <li>
          <NavLink to="/create" className="sidenav-close">
            Create
          </NavLink>
        </li>
        <li>
          <NavLink to="/links" className="sidenav-close">
            Links
          </NavLink>
        </li>
        <li>
          <a href="/" onClick={logoutHandler}>
            Logout
          </a>
        </li>
      </ul>
    </>
  );
};
