import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getPlantList, handleUpdate, deletePlant } from "../../actions";

class Home extends React.Component {
  componentDidMount = () => {
    const userId = localStorage.getItem("userId");
    this.props.getPlantList(userId);
  };

  handleUpdate = (e, plant) => {
    e.preventDefault();
    this.props.handleUpdate(plant);
    this.props.history.push("/add-plant");
  };

  handleDelete = (e, id) => {
    e.preventDefault();
    this.props
      .deletePlant(id)
      .then(() => {
        const userId = localStorage.getItem("userId");
        this.props.getPlantList(userId);
        this.props.history.push("/");
      })
      .catch(() => {
        this.props.history.push("/");
      });
  };

  render() {
    console.log(this.props.plants);
    return this.props.plants.length > 0 ? (
      <div>
        <ul>
          {this.props.plants.map(plant => {
            return (
              <li key={plant.id}>
                <div>
                  <Link to={`/plant/${plant.id}`}>{plant.name}</Link>
                  <img src={plant.plantURL} />
                  <button onClick={e => this.handleUpdate(e, plant)}>
                    update
                  </button>
                  <button onClick={e => this.handleDelete(e, plant.id)}>
                    delete
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    ) : (
      <p>no plants here</p>
    );
  }
}

const mapStateToProps = state => {
  return {
    plants: state.listReducer.plants
  };
};

export default connect(
  mapStateToProps,
  { getPlantList, handleUpdate, deletePlant }
)(Home);
