import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import Menu from "../JSON/menu.json";
import { DataContext } from "./Context";
import { FiLogOut, FiSettings } from "react-icons/fi";
import { FaUser, FaShoppingBasket } from "react-icons/fa";

// set onClick for logo to close the menu - to do
const Nav = ({ logo }) => {
  const [open, setOpen] = useState(false);
  const [close, setClose] = useState(true);
  const [none, setNone] = useState(true);
  const [show, setShow] = useState(true);
  const [closeUser, setCloseUser] = useState(true);
  const [openUser, setOpenUser] = useState(false);
  //use the context
  const [data, setData] = useContext(DataContext);
  //console.log("nav data",data.token);
  // get the userName
  const userName = data?.user?.username.toUpperCase();

  //hamburgerMenu
  const navMenu = Menu.map((obj) => {
    const { id, name, path } = obj;
    return (
      <li key={id}>
        <Link to={path}>{name}</Link>
      </li>
    );
  });
  //userMenu
  const showEditUser = () => {
    setOpenUser(openUser);
    setCloseUser(!closeUser);
    setShow(!show);
  };
  const closeUserMenu = () => {
    setCloseUser(true);
    setShow(true);
  };

  const showMenu = () => {
    setOpen(open);
    setClose(!close);
    setNone(!none);
    closeUserMenu();
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
          <Link to="/admindash">
        <button >Admin Dashboard</button>
                 
                </Link>
          <Link to="/basket">
                  <button>Basket</button>
                </Link>

          <div>
            {data ? (
              <>
                {" "}
                <Link to="/basket">
                  <li id="basket">
                    <FaShoppingBasket />
                  </li>
                </Link>
                <div
                  className={closeUser ? "hamburger close" : "hamburger open"}
                  onClick={showEditUser}
                >
                  <li>
                    <FaUser />
                  </li>
                </div>
                <ul
                  className={show ? "userNone" : "userShow"}
                  onClick={showEditUser}
                >
                  <li> WELCOME: {userName}</li>

                  <Link to="/settings">
                    <li>
                      {" "}
                      Settings <FiSettings />
                    </li>
                  </Link>

                  <li onClick={logOut} alt="logout">
                    Logout <FiLogOut />
                  </li>
                </ul>
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
