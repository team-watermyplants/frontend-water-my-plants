import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getData, handleUpdate, deletePlant } from "../../actions";

class Home extends React.Component {
  componentDidMount = () => {
    const userId = localStorage.getItem("userId");
    this.props.getData(userId);
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
      this.props.getData(userId);
      this.props.history.push("/");
    });
  };

  render() {
    return this.props.plants ? (
      <div>
        <ul>
          {this.props.plants.map(plant => {
            return (
              <li key={plant.id}>
                <div>
                  <Link to={`/plant/${plant.id}`}>{plant.name}</Link>
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
      <p>loading...</p>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    plants: state.listReducer.plants
  };
};

export default connect(
  mapStateToProps,
  { getData, handleUpdate, deletePlant }
)(Home);
