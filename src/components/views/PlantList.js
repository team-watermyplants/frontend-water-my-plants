import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getData } from "../../actions";

class Home extends React.Component {
  componentDidMount = () => {
    const userId = localStorage.getItem("userId");
    this.props.getData(userId);
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
    plants: state.listReducer.plants,
  };
};

export default connect(
  mapStateToProps,
  { getData }
)(Home);
