import React, { Component } from 'react';
import { Route, NavLink, withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import 'materialize-css/dist/css/materialize.min.css';

import ProtectedRoute from './components/ProtectedRoute';

import PlantForm from './components/forms/PlantForm';
import Login from './components/forms/Login';
import SignUp from './components/forms/SignUp';
import Home from './components/views/Home';
import Plant from './components/views/Plant';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
class App extends Component {
  handleLogOut = e => {
    e.preventDefault();
    localStorage.clear();
    this.props.history.push('/login');
  };
  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          {localStorage.getItem('userId') ? (
            <nav
              style={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'space-between',
                height: '75px',
                background: '#00796B',
                position: 'sticky',
              }}
            >
              <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
                <i class="fas fa-seedling fa-3x" style={{ marginLeft: 20 }} />
              </Link>
              <div style={{ display: 'flex' }}>
                <NavLink
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    color: 'white',
                    fontSize: '20px',
                    height: '40px',
                    marginRight: '20px',
                    border: '1px solid white',
                    borderRadius: '2.5px',
                    padding: '0 20px',
                  }}
                  activeStyle={{
                    color: '#00796B',
                    background: 'white',
                  }}
                  exact
                  to="/"
                >
                  Home
                </NavLink>
                <NavLink
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    color: 'white',
                    fontSize: '20px',
                    height: '40px',
                    padding: '0 20px',
                    marginRight: '10px',
                    border: '1px solid white',
                    borderRadius: '2.5px',
                  }}
                  activeStyle={{
                    color: '#00796B',
                    background: 'white',
                  }}
                  to="/add-plant"
                >
                  Add Plant
                </NavLink>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    background: 'none',
                    color: 'white',
                    fontSize: '20px',
                    height: '40px',
                    padding: '0 20px',
                    marginRight: '10px',
                    border: '1px solid white',
                    borderRadius: '2.5px',
                  }}
                  onClick={this.handleLogOut}
                >
                  Log Out
                </div>
              </div>
            </nav>
          ) : (
            <nav
              style={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'space-between',
                height: '75px',
                background: '#00796B',
                position: 'sticky',
              }}
            >
              <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
                <i class="fas fa-seedling fa-3x" style={{ marginLeft: 20 }} />
              </Link>
              <div style={{ display: 'flex' }}>
                <NavLink
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    color: 'white',
                    fontSize: '20px',
                    height: '40px',
                    marginRight: '20px',
                    border: '1px solid white',
                    borderRadius: '2.5px',
                    padding: '0 20px',
                  }}
                  activeStyle={{
                    color: '#00796B',
                    background: 'white',
                  }}
                  to="/login"
                >
                  Login
                </NavLink>
                <NavLink
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    color: 'white',
                    fontSize: '20px',
                    height: '40px',
                    marginRight: '20px',
                    border: '1px solid white',
                    borderRadius: '2.5px',
                    padding: '0 20px',
                  }}
                  activeStyle={{
                    color: '#00796B',
                    background: 'white',
                  }}
                  to="/sign-up"
                >
                  Sign Up
                </NavLink>
              </div>
            </nav>
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
