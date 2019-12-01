import React from "react";
import "./NavBar.css";

class NavBarUnlogged extends React.Component {

    render() {
        return (
            <div className="topnav">
                <h2 className="textoprincipal">To-dos</h2>
                <div className="login-container">
                    <input type="text" placeholder="Usuário" name="username"/>
                    <input type="password" placeholder="Senha" name="psw"/>
                    <button>Login</button>
                </div>
            </div>
        );
    }
}

export default NavBarUnlogged;
