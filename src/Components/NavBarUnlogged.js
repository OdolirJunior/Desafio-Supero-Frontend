import React from "react";
import "./NavBar.css";
const API = "/users";
class NavBarUnlogged extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        username: "",
        psw: ""
      },
      userGet: {}
    };
  }
  async handleChange(e) {
    await this.setState({
      user: { ...this.state.user, [e.target.name]: e.target.value }
    });
  }
  login() {
    fetch(`${API}/${this.state.user.username}/${this.state.user.psw}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    })
      .then(response => response.json())
      .then(userGet => {
        this.setState({ userGet });
      });
  }

  render() {
    return (
      <div className="topnav">
        <h2 className="textoprincipal">To-dos</h2>
        <div className="login-container">
          <input type="text" placeholder="Usuário" name="username" onChange={e => this.handleChange(e)} />
          <input type="password" placeholder="Senha" name="psw" onChange={e => this.handleChange(e)} />
          <button onClick={() => this.login()}>Login</button>
        </div>
      </div>
    );
  }
}

export default NavBarUnlogged;
