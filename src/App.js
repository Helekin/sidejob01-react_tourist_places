import React from "react";
import { Route, Switch } from "react-router-dom";

import Dashboard from "./components/Layout/Dashboard";

import HomeScreen from "./screens/Home/HomeScreen";
import PlacesScreen from "./screens/Place/PlacesScreen";

const App = () => {
  return (
    <div style={{ display: "flex", marginTop: 50 }}>
      <Dashboard />
      <Switch>
        <Route path="/dashboard" component={HomeScreen} exact />
        <Route path="/dashboard/places" component={PlacesScreen} exact />
      </Switch>
    </div>
  );
};

export default App;
