import React from "react";
import { connect } from "react-redux";
import {
  getPlant,
  handleUpdate,
  deletePlant,
  getPlantList
} from "../../actions";
import axios from "axios";

import 'materialize-css/dist/css/materialize.min.css';

import './Plant.css';

class Plant extends React.Component {
  state = {
    notifications: [],
    plant: null
  };
  componentDidMount = () => {
    const id = this.props.match.params.id;
    console.log(id);
    this.props
      .getPlant(id)
      .then(res => {
        console.log(res);
        this.setState({
          plant: res.payload.data[0]
        });
      })
      .then(() => {
        axios
          .get(
            `https://api-watermyplants.herokuapp.com/api/plants/${id}/notifications`
          )
          .then(res => {
            this.setState({
              notifications: res.data
            });
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
        <>
        <div className='plant-container'>
          <div className="row">
          <div className="col s12 m6">
            <div className="card teal lighten-3">
            <div className='top-card'>
              <div className="card-content white-text">
                <h1 className='plant-name'>{this.state.plant.name}</h1>
                <span className="card-title">location: <strong>{this.state.plant.location}</strong></span>
                <p>description: {this.state.plant.description}</p>
              </div>
              <div className='image-content'>
              <img className='plant-image z-depth-2' src={this.state.plant.plantURL} />
              </div>
              </div>
              <div className='notif-box z-depth-2'>
              <h5 className='notif-title'><strong>Notifications:</strong></h5>
                <ul className='notif-list'> 
                  {this.state.notifications.map(notification => {
                    return (
                      <li className='notif-list-item'>{JSON.stringify(notification)}</li>
                    );
                  })}
                </ul>
              </div>
              <div className="card-action">
                <button className='btn-large teal darken-2' onClick={e => this.handleUpdate(e, this.state.plant)}>
              update
            </button>
            <button className='btn-large teal darken-2' onClick={e => this.handleDelete(e, this.state.plant.id)}>
              delete
            </button>
              </div>
            </div>
          </div>

        </div>
        
      </div>   
      

        
        </>
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
  { getPlant, handleUpdate, deletePlant, getPlantList }
)(Plant);
