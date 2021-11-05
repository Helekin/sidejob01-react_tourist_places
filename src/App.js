import React from "react";
import { Route, Switch } from "react-router-dom";

import Dashboard from "./components/Layout/Dashboard";

import HomeScreen from "./screens/Home/HomeScreen";
import PlaceListScreen from "./screens/Place/PlaceListScreen";
import PlaceCreateScreen from "./screens/Place/PlaceCreateScreen";

const App = () => {
  return (
    <div style={{ display: "flex", marginTop: 50 }}>
      <Dashboard />
      <Switch>
        <Route path="/dashboard" component={HomeScreen} exact />
        <Route path="/dashboard/places" component={PlaceListScreen} exact />
        <Route
          path="/dashboard/place/create"
          component={PlaceCreateScreen}
          exact
        />
      </Switch>
    </div>
  );
};

export default App;
