import React, { Component } from "react";
import { Route, NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import AddPlant from "./components/forms/AddPlant";
import Login from "./components/forms/Login";
import SignUp from "./components/forms/SignUp";
import Home from "./components/views/Home";
import Calendar from "./components/views/Calendar";
import Plant from "./components/views/Plant";
import PlantList from "./components/views/PlantList";

import ProtectedRoute from "./components/ProtectedRoute";

class App extends Component {
  render() {
    return (
      <div className="App">
        <nav />
        <section>
          <Route path="/login" render={props => <Login {...props} />} />
          <ProtectedRoute path="/home" component={Home} />
        </section>
      </div>
    );
  }
}

export default withRouter(
  connect(
    null,
    {}
  )(App)
);