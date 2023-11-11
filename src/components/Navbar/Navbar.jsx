import React from "react";
// import Search from "../Search/Search";
import "./Navbar.css";
import { FaMoon, FaSun } from "react-icons/fa";
import { BsFillCartFill } from "react-icons/bs";
import Logo from "../../media/logo.png";
const Navbar = () => {
  const theme = "light";
  return (
    <div className="nav-container">
      <div className="logo">
        <img src={Logo} alt="" />
      </div>
      {/* <Search /> */}
      <div className="nav-right">
        {theme === "light" ? (
          <FaMoon className="moon" />
        ) : (
          <FaSun className="sun" />
        )}
        <BsFillCartFill />
        {/* <div className="profile-img">
          <img src="img/profilePic.png" alt="profilePic" />
        </div> */}
      </div>
    </div>
  );
};

export default Navbar;
