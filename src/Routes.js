import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import Todo from "./Containers/Todo/Todo";
import Login from "./Containers/Login/Login";

class Routes extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLogged: true };
  }

  render() {
    return this.state.isLogged ? (
      <Router history={this.props.history}>
        <Switch>
          <Route path="/todos" exact component={() => <Todo />} />
        </Switch>
      </Router>
    ) : (
      <Router history={this.props.history}>
        <Switch>
          <Route path="/login" exact component={() => <Login />} />
        </Switch>
      </Router>
    );
  }
}
export default Routes;
