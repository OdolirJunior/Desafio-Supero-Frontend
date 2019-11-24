import React from "react";
import "./NavBar.css";
class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogged: true
    };
  }
  componentDidMount() {}
  render() {
    return (
      <div className="topnav">
        <h2 className="textoprincipal">To-dos</h2>
        {this.state.isLogged ? (
          <div className="login-container">
            <input type="text" placeholder="Username" name="username" />
            <input type="password" placeholder="Password" name="psw" />
          </div>
        ) : (
          <div className="login-container">Meu nome</div>
        )}
      </div>
    );
  }
}
export default NavBar;
