import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import Menu from "../JSON/menu.json";
import LogoData from "../JSON/logo.json";
import { DataContext } from "./Context";
import { FiLogOut } from "react-icons/fi";

// set onClick for logo to close the menu - to do
const Nav = () => {
  const [open, setOpen] = useState(false);
  const [close, setClose] = useState(true);
  const [none, setNone] = useState(true);
  //use the context
  const [data, setData] = useContext(DataContext);
  //console.log(data?.user?.basket.length);
  var basket = data?.user?.basket.length;

  const navMenu = Menu.map((obj) => {
    const { id, name, path } = obj;
    return (
      <li key={id}>
        <Link to={path}>{name}</Link>
      </li>
    );
  });

   // Logo setup
  const logo = LogoData.map((obj) => {
    const { id, name, path, img } = obj;
    return (
        <Link to={path}>
          <img src={img} alt={name} key={id} className={name} />
        </Link>
    );
  });

  const showMenu = () => {
    setOpen(open);
    setClose(!close);
    setNone(!none);
  };
  // closing hamburger menu function
  const closeMenu = () => {
    setClose(true);
    setNone(true);
  };
  //logout
  const logOut = () => {
    localStorage.clear();
    setData("");
    closeMenu();
    redirect();
  };
  // redirect to login when its logged out
  let history = useHistory();
  const redirect = () => {
    history.push("/login");
  };

  return (
    <header>
      <nav>
        <div className="nav-top">
          <Link to="/">
            <div className="logo-container"  onClick={closeMenu}>{logo}</div>
          </Link>
          <Link to="/basket">
                  <button>Basket</button>
                </Link>

          <div>
            {data ? (
              <>
                {" "}
                <div
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                  onClick={logOut}
                  alt="logout"
                >
                  <FiLogOut />
                </div>
              </>
            ) : (
              <>
                <Link
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    textDecoration: "none",
                  }}
                  onClick={closeMenu}
                  to="/login"
                >
                  sign in
                </Link>
                {"  "}
                <Link
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    textDecoration: "none",
                  }}
                  onClick={closeMenu}
                  to="/register"
                >
                  sign up
                </Link>
              </>
            )}
          </div>
          <div
            className={close ? "hamburger close" : "hamburger open"}
            onClick={showMenu}
          >
            <div className="menu-roof"></div>
            <div className="menu-top"></div>
            <div className="menu-center"></div>
            <div className="menu-bottom"></div>
          </div>
        </div>
        <ul className={none ? "none" : "show"} onClick={showMenu}>
          {navMenu}
        </ul>
      </nav>
    </header>
  );
};

export default Nav;
