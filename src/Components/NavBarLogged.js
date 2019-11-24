import React from "react";
import "./NavBar.css";

class NavBarLogged extends React.Component {

    render() {
        return (
            <div className="topnav">
                <h2 className="textoprincipal">To-dos</h2>
                <div className="login-container">Meu nome</div>
            </div>
        );
    }
}

export default NavBarLogged;
