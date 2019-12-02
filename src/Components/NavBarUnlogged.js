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
        id = "user";
        document.cookie = id + "=" + userGet.value;
      });
    this.setLoginCookies();
  }
  setLoginCookies = () => {
    let id;
    let value;

    id = "username";
    value = document.getElementById(id).value;
    document.cookie = id + "=" + value;

    id = "psw";
    value = document.getElementById(id).value;
    document.cookie = id + "=" + value;
  };

  componentDidMount() {
    this.getLoginCookies();
  }

  getLoginCookies = () => {
    let loginCookies = document.cookie.split("; ");

    let username = loginCookies[0].split("=")[1];
    let psw = loginCookies[1].split("=")[1];

    this.refs.username.value = username;
    this.refs.pwd.value = psw;
  };

  render() {
    return (
      <div className="topnav">
        <h2 className="textoprincipal">To-dos</h2>
        <div className="login-container">
          <input
            type="text"
            maxLength="200"
            placeholder="Usuário"
            name="username"
            id="username"
            ref="username"
            required
            onChange={e => this.handleChange(e)}
          />
          <input type="password" maxLength="200" placeholder="Senha" name="psw" id="psw" ref="pwd" required onChange={e => this.handleChange(e)} />
          <button onClick={() => this.login()}>Login</button>
        </div>
      </div>
    );
  }
}

export default NavBarUnlogged;
