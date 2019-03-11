import React, { Component } from "react";
import { Route, NavLink } from "react-router-dom";
import { connect } from "react-redux";

import AddPlant from "./components/forms/AddPlant";
import Login from "./components/forms/Login";
import SignUp from "./components/forms/SignUp";
import Home from "./components/views/Home";
import Calendar from "./components/views/Calendar";
import Plant from "./components/views/Plant";
import PlantList from "./components/views/PlantList";

import ProtectedRoute from "./components/ProtectedRoute";

import authenticate from "./authentication/authenticate";

const Display = authenticate(Login)(Home);

class App extends Component {
  render() {
    return (
      <div className="App">
        <nav />
        <section>
          <Display />
        </section>
      </div>
    );
  }
}

export default connect(
  null,
  {}
)(App);
