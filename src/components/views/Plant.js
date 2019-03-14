import React from "react";
import { connect } from "react-redux";
import {
  getPlant,
  handleUpdate,
  deletePlant,
  getPlantList
} from "../../actions";

class Plant extends React.Component {
  state = {
    plant: null,
  };
  componentDidMount = () => {
    const id = this.props.match.params.id;
    console.log(id);
    this.props.getPlant(id).then(res => {
      console.log(res);
      this.setState({
        plant: res.payload.data[0],
      });
    });
  };

  handleUpdate = (e, plant) => {
    e.preventDefault();
    this.props.handleUpdate(plant);
    this.props.history.push("/add-plant");
  };

  handleDelete = (e, id) => {
    e.preventDefault();
    console.log("id", id);
    this.props.deletePlant(id).then(() => {
      const userId = localStorage.getItem("userId");
      this.props.getPlantList(userId).then(() => {
        this.props.history.push("/");
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
          <button onClick={e => this.handleUpdate(e, this.state.plant)}>
            update
          </button>
          <button onClick={e => this.handleDelete(e, this.state.plant.id)}>
            delete
          </button>
          <p>
            image: <img src={this.state.plant.plantURL} />
          </p>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    plants: state.listReducer.plants,
  };
};

export default connect(
  mapStateToProps,
  { getPlant, handleUpdate, deletePlant, getPlantList }
)(Plant);
