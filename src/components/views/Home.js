import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPlantList, handleUpdate, deletePlant } from '../../actions';
import defaultImage from '../../images/defaultImage.jpg';
import './Home.css';

class Home extends React.Component {
  componentDidMount = () => {
    const userId = localStorage.getItem('userId');
    this.props.getPlantList(userId);
  };

  handleUpdate = (e, plant) => {
    e.preventDefault();
    this.props.handleUpdate(plant);
    this.props.history.push('/add-plant');
  };

  handleDelete = (e, id) => {
    e.preventDefault();
    this.props
      .deletePlant(id)
      .then(() => {
        const userId = localStorage.getItem('userId');
        this.props.getPlantList(userId).then(() => {
          this.props.history.push('/');
        });
      })
      .catch(() => {
        this.props.history.push('/');
      });
  };

  render() {
    console.log(this.props.plants);
    return this.props.plants.length > 0 ? (
      <div className="home--container">
        <div className="home--grid">
          {this.props.plants.map(plant => {
            return (
              <div
                className="home--gridTile"
                key={plant.id}
                style={{
                  backgroundImage: `url(${plant.plantURL || defaultImage})`,
                }}
              >
                <Link to={`/plant/${plant.id}`}>
                  <h4 className="home--plantName">{plant.name}</h4>
                </Link>
                <div className="home--tileMenu">
                  <button
                    className="home--button"
                    onClick={e => this.handleUpdate(e, plant)}
                  >
                    UPDATE
                  </button>
                  <button
                    className="home--button"
                    onClick={e => this.handleDelete(e, plant.id)}
                  >
                    DELETE
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    ) : (
      <p>no plants here</p>
    );
  }
}

const mapStateToProps = state => {
  return {
    plants: state.listReducer.plants,
  };
};

export default connect(
  mapStateToProps,
  { getPlantList, handleUpdate, deletePlant }
)(Home);
