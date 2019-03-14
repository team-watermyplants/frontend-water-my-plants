import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getData, deletePlant } from '../../actions';

class Home extends React.Component {
  componentDidMount = () => {
    const userId = localStorage.getItem('user id');
    this.props.getData(userId);
  };

  render() {
    return this.props.plants ? (
      <div>
        <ul>
          {this.props.plants.map(plant => {
            return (
              <li>
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
    userInfo: state.login.userInfo,
  };
};

export default connect(
  mapStateToProps,
  { getData, deletePlant }
)(Home);
