import React, { Component } from 'react'
import { Route, NavLink, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import ProtectedRoute from './components/ProtectedRoute'

import PlantForm from './components/PlantForm'
import AddPlant from './components/forms/AddPlant'
import Login from './components/forms/Login'
import SignUp from './components/forms/SignUp'
import Home from './components/views/Home'
import PlantCalendar from './components/views/PlantCalendar'
import Plant from './components/views/Plant'
import PlantList from './components/views/PlantList'
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from 'material-ui/AppBar'
class App extends Component {
  render () {
    return (
      <MuiThemeProvider>
        <div className='App'>
          <AppBar title='Water My Plants'>
            <NavLink to='/home'>home</NavLink>
          </AppBar>
          <section>
            <Route
              path='/add-plant'
              render={props => <PlantForm {...props} />}
            />
            <Route path='/login' render={props => <Login {...props} />} />
            <Route path='/sign-up' render={props => <SignUp {...props} />} />
            <ProtectedRoute path='/home' component={Home} />
          </section>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default withRouter(connect(null, {})(App))
