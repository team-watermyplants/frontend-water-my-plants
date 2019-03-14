import React, { Component } from "react";
import { Route, NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import "materialize-css/dist/css/materialize.min.css";

import ProtectedRoute from "./components/ProtectedRoute";

import PlantForm from "./components/forms/PlantForm";
import Login from "./components/forms/Login";
import SignUp from "./components/forms/SignUp";
import Home from "./components/views/Home";
import Plant from "./components/views/Plant";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
class App extends Component {
  handleLogOut = e => {
    e.preventDefault();
    localStorage.clear();
    this.props.history.push('/login')
  };
  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          {localStorage.getItem("userId") ? (
            <AppBar title="Water My Plants">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/add-plant">Add Plant</NavLink>
              <button onClick={this.handleLogOut}>
                Log Out
              </button>
            </AppBar>
          ) : (
            <AppBar title="Water My Plants">
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/sign-up">Sign Up</NavLink>
            </AppBar>
          )}
          <section>
            <Route path="/login" render={props => <Login {...props} />} />
            <Route path="/sign-up" render={props => <SignUp {...props} />} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute path="/add-plant" component={PlantForm} />
            <ProtectedRoute path="/plant/:id" component={Plant} />
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
