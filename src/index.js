import React from "react";
import ReactDOM from "react-dom";
import history from "./history";
import "./index.css";
import Routes from "./Routes";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<Routes history={history} />, document.getElementById("root"));

serviceWorker.unregister();
