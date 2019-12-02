import React from "react";
import "./NavBar.css";

class NavBarLogged extends React.Component {
  myName() {
    let myName = document.cookie && document.cookie.split("; ");
    if (myName[0]) {
      return myName[0].split("=")[1];
    }
  }

  logout() {
    document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    window.location.reload();
  }

  render() {
    return (
      <div className="topnav">
        <h2 className="textoprincipal">To-dos</h2>
        <div className="login-container">
          {this.myName()}
          <button className="logout-button" onClick={this.logout}>
            Logout
          </button>
        </div>
      </div>
    );
  }
}

export default NavBarLogged;
