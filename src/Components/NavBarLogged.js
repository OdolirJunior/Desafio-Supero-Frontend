import React from "react";
import "./NavBar.css";

class NavBarLogged extends React.Component {
  myName() {
    let myName = document.cookie && document.cookie.split("; ");
    if (myName[0]) {
      return myName[0].split("=")[1];
    }
  }
  render() {
    return (
      <div className="topnav">
        <h2 className="textoprincipal">To-dos</h2>
        <div className="login-container">{this.myName()}</div>
      </div>
    );
  }
}

export default NavBarLogged;
