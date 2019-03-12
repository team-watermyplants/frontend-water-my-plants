import React, { Component } from "react";
import { Route, NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import ProtectedRoute from "./components/ProtectedRoute";

import PlantForm from "./components/forms/PlantForm";
import Login from "./components/forms/Login";
import SignUp from "./components/forms/SignUp";
import Home from "./components/views/Home";
import PlantCalendar from "./components/views/PlantCalendar";
import Plant from "./components/views/Plant";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <AppBar title="Water My Plants">
            <NavLink to="/">home</NavLink>
            <NavLink to="/add-plant">add plant</NavLink>
          </AppBar>
          <section>
            <Route path="/login" render={props => <Login {...props} />} />
            <Route path="/sign-up" render={props => <SignUp {...props} />} />
            <ProtectedRoute path="/" component={Home} />
            <ProtectedRoute
              path="/add-plant"
              render={props => <PlantForm {...props} />}
            />
            <ProtectedRoute
              path="/plant/:id"
              render={props => <Plant {...props} />}
            />
          </section>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withRouter(
  connect(
    null,
    {}
  )(App)
);
