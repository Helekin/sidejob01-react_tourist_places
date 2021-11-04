import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./store/store";

import LoginScreen from "./screens/User/LoginScreen";
import App from "./App";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/" component={LoginScreen} exact />
        <Route path="/dashboard" component={App} exact />
        <App />
      </Switch>
    </Router>
  </Provider>,

  document.getElementById("root")
);
