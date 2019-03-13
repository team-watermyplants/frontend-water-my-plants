import React, { Component } from 'react';
import { Route, NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import ProtectedRoute from './components/ProtectedRoute';

import PlantForm from './components/forms/PlantForm';
import Login from './components/forms/Login';
import SignUp from './components/forms/SignUp';
import Home from './components/views/Home';
import PlantCalendar from './components/views/PlantCalendar';
import Plant from './components/views/Plant';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <AppBar title="Water My Plants">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/sign-up">Sign Up</NavLink>
            <NavLink to="/add-plant">Add Plant</NavLink>
          </AppBar>
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
