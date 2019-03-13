import React from "react";
import { connect } from "react-redux";
import { getData } from "../../actions";

class Plant extends React.Component {
  state = {
    plant: null
  };
  componentDidMount = () => {
    const id = this.props.match.params.id;
    this.props.getData(localStorage.getItem("userId")).then(() => {
      this.setState({
        plant: this.props.plants.find(plant => plant.id == id)
      });
    });
  };
  render() {
    if (!this.state.plant) {
      return (
        <div>
          <p>loading...</p>
        </div>
      );
    } else {
      return (
        <div>
          <p>name: {this.state.plant.name}</p>
          <p>location: {this.state.plant.location}</p>
          <p>description: {this.state.plant.description}</p>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    plants: state.listReducer.plants
  };
};

export default connect(
  mapStateToProps,
  { getData }
)(Plant);
