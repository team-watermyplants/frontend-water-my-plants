import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPlantList, handleUpdate, deletePlant } from '../../actions';
import defaultImage from '../../images/defaultImage.jpg';
import './Home.css';
import 'material-design-icons/iconfont/material-icons.css';


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
      <div className="container">
        {this.props.plants.map(plant => {
          return (
            <div className="card small" key={plant.id}>
              <div className="card-image waves-effect waves-block waves-light">
                <img className="activator" src={plant.plantURL || defaultImage} alt={plant.description}/>
              </div>
              <div className="card-content">
                <span className="card-title activator grey-text text-darken-4">
                  {plant.name}
                  <i className="material-icons right">more_vert</i>
                </span>
                <p>
                  <Link to={`/plant/${plant.id}`}>Go to plant page</Link>
                </p>
              </div>
              <div className="card-reveal">
                <span className="card-title grey-text text-darken-4">
                  {plant.name}
                  <i className="material-icons right">close</i>
                </span>
                <p className="flow-text text">{plant.description}</p>
                <div className="btn-home">
                  <button
                    className="btn-large teal darken-2"
                    onClick={e => this.handleUpdate(e, plant)}
                  >
                    update
                  </button>
                  <button
                    className="btn-large teal darken-2"
                    onClick={e => this.handleDelete(e, plant.id)}
                  >
                    delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
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
