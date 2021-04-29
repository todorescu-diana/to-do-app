import React from "react";
import logo from "./todologo.png";
import "./Header.css";

function Header(props) {
  return (
    <div className="HeaderLogo">
      <img src={logo} alt="Logo" className="logoImage" />
      <p className="Quote">{props.quote}</p>
    </div>
  );
}

export default Header;
