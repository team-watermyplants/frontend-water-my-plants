import React from "react";
import PlantList from "./PlantList";
import { connect } from 'react-redux'

class Home extends React.Component {
  render() {
    return (
      <div>
        <PlantList />
      </div>
    );
  }
}

export default connect(
  null,
  {}
)(Home);
