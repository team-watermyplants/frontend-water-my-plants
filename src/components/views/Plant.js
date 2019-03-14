import React from "react";
import { connect } from "react-redux";
import { getPlant } from "../../actions";

class Plant extends React.Component {
  state = {
    plant: null
  };
  componentDidMount = () => {
    const id = this.props.match.params.id;
    console.log(id)
    this.props.getPlant(id)
    .then(res =>{
      console.log(res)
      this.setState({
        plant: res
      })
    })
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
  { getPlant }
)(Plant);
