import React, { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Menu from "../JSON/menu.json";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import { DataContext } from "./UserContext";
import { FiLogOut, FiSettings } from "react-icons/fi";
import { FaUser, FaShoppingBasket } from "react-icons/fa";
import { GoUnverified, GoVerified, GoMailRead } from "react-icons/go";

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
  const [token, setToken] = useContext(AuthContext);
  //get editUser data
  const getData = () => {
    const config = {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    };
    axios("/user/checkAuth", config)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err?.response?.data.message);
      });
  };

  // get the userName && Account status
  const userName = data?.user?.username.toUpperCase();
  const accountVerified = data?.user?.verifyAccount;

  // on scroll function to animate the nav menu
  const [showOnScroll, setShowOnScroll] = useState("animate");
  const controlNav = () => {
    if (window.scrollY > 100) {
      setShowOnScroll("animate");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNav);
    return () => {
      window.removeEventListener("scroll", controlNav);
    };
  }, []);

  //hamburgerMenu
  const navMenu = Menu.map((obj) => {
    const { id, name, path } = obj;
    return (
      <Link to={path}>
        <li key={id}>{name}</li>
      </Link>
    );
  });
  //userMenu
  const showEditUser = () => {
    setOpenUser(openUser);

    setCloseUser(!closeUser);
    setShow(!show);
    closeMenu();
    if (show === true) {
      getData();
    }
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
    setToken("");
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
      <nav className={`laptop-setup animate ${showOnScroll}`}>
        <div className="nav-top">
          <div className="logo-container" onClick={closeMenu}>
            {logo}
          </div>
          <div className="nav-user">
            {token ? (
              <>
                <Link to="/basket">
                  <li id="basket" key="50" onClick={closeMenu}>
                    <FaShoppingBasket />
                  </li>
                </Link>
                <div
                  className={closeUser ? "hamburger close" : "hamburger open"}
                  onClick={showEditUser}
                >
                  <li key="51">
                    <FaUser />
                  </li>
                </div>
                <ul
                  className={show ? "user-none" : "user-show"}
                  onClick={showEditUser}
                >
                  <li key="52"> WELCOME: {userName}</li>

                  <Link to="/settings">
                    <li key="53">
                      Settings <FiSettings />
                    </li>
                  </Link>
                  <li key="54" style={{display:"flex", flexDirection: "row"}}>
                    Account:{" "}
                    {accountVerified ? (
                      <GoVerified style={{ color: "green" }} />
                    ) : (
                      <span >
                        <Link style={{display:"flex", flexDirection: "row", color: "red" ,justifyContent:"space-between", cursor:"pointer",width:"6rem"}} to="/ReVerifyAccount" >
                          <GoUnverified />{""}<p>(Verify !)</p>
                        </Link>
                      </span>
                    )}
                  </li>
                  <li key="55" onClick={logOut} alt="logout">
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
        <ul
          className={none ? "none hide" : "show"}
          id="laptop"
          onClick={showMenu}
        >
          {navMenu}
        </ul>
      </nav>
    </header>
  );
};

export default Nav;
