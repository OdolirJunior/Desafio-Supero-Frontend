import React from "react";
import "./NavBar.css";

class NavBarLogged extends React.Component {
  myName() {
    let id = "";
    let cookie = document.cookie && document.cookie.split("; ");
    if (cookie && cookie.length > 0) {
      cookie.forEach(data => {
        if (data.includes("username=")) {
          let info = data.split("=");
          if (info && info[1]) {
            id = info[1];
          }
        }
      });
    }
    return id;
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
