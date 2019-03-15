import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPlantList, handleUpdate, deletePlant } from '../../actions';

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
      <div>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            flexDirection: '',
            margin: '50px',
          }}
        >
          {this.props.plants.map(plant => {
            return (
              <div>
                <Link to={`/plant/${plant.id}`}>
                  <div
                    key={plant.id}
                    style={{
                      backgroundImage: `url(${plant.plantURL})`,
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      margin: '20px 10px',
                      height: 300,
                      width: 300,
                      borderRadius: 10,
                      alignItems: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                  >
                    <h1
                      style={{
                        color: 'white',
                        margin: '10 0',
                        padding: 0,
                        fontVariant: 'small-caps',
                        letterSpacing: '2px',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {plant.name}
                    </h1>

                    <div
                      style={{
                        marginBottom: 50,
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <button
                        style={{
                          cursor: 'pointer',
                          background: 'none',
                          color: 'white',
                          fontVariant: 'uppercase',
                          marginRight: '20px',
                          display: 'block',
                          width: '100%',
                          border: '3px solid white',
                          padding: '10px 20px',
                          fontWeight: 'bold',
                        }}
                        onClick={e => this.handleUpdate(e, plant)}
                      >
                        UPDATE
                      </button>
                      <button
                        style={{
                          cursor: 'pointer',
                          background: 'none',
                          color: 'white',
                          fontVariant: 'uppercase',
                          margin: '0 10',
                          display: 'block',
                          width: '100%',
                          border: '3px solid white',
                          padding: '10px 20px',
                          fontWeight: 'bold',
                        }}
                        onClick={e => this.handleDelete(e, plant.id)}
                      >
                        DELETE
                      </button>
                    </div>
                  </div>
                </Link>
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
