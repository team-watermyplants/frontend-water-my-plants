import React, { Component } from "react";
import { Route, NavLink } from "react-router-dom";

import AddPlant from "./components/forms/AddPlant";
import Authentication from "./components/forms/Authentication";
import Calendar from "./components/views/Calendar";
import Plant from "./components/views/Plant";
import PlantList from "./components/views/PlantList";
import PlantForm from './components/PlantForm';
import ProtectedRoute from './components/ProtectedRoute'

class App extends Component {
  render() {
    return <div className="App">
      <nav>
      </nav>
      <section>
        <Route path='/add-plant' render={props => <PlantForm {...props} />} />
      </section>
    </div>;
  }
}

export default App;
