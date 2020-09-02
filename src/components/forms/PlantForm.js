import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';
import M from 'materialize-css';
import Select from 'react-select';

import ImageResults from '../ImageResults';
import { addPlant, updatePlant, cancelUpdate } from '../../actions';

import 'materialize-css/dist/css/materialize.min.css';
import 'react-datepicker/dist/react-datepicker.css';
// import './PlantForm.css';

const options = [
  { value: 1, label: 'every day' },
  { value: 2, label: 'every other day' },
  { value: 7, label: 'once a week' },
];
class PlantForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      plant: {
        name: '',
        description: '',
        location: '',
        plantURL: '',
      },
      searchPlant: '',
      apiUrl: 'https://api.unsplash.com/search/photos',
      amount: 5,
      images: [],
      startDate: new Date(),
      selectedOption: null,
    };
  }

  componentDidMount = () => {
    if (this.props.activePlant) {
      this.setState({
        plant: this.props.activePlant,
      });
    }
    //Materialize select menu
    M.AutoInit();
  };

  searchChangeHandler = e => {
    const apiKey = process.env.REACT_APP_IMAGE_API_KEY
    let val = e.target.value;
    this.setState({ [e.target.name]: val }, () => {
      val === ''
        ? this.setState({ images: [] })
        : axios
            .get(
              `${this.state.apiUrl}/?client_id=${
                apiKey
              }&query=plant,${this.state.searchPlant}&per_page=${
                this.state.amount
              }`
            )
            .then(res => {
              this.setState({ images: res.data.results });
            })
            .catch(err => console.log(err));
    });
  };

  changeHandler = e => {
    this.setState({
      plant: {
        ...this.state.plant,
        [e.target.name]: e.target.value,
      },
    });
  };

  selectImage = (e, img) => {
    e.preventDefault();
    this.setState({
      images: [],
      searchPlant: 'Great Choice!',
      plant: { ...this.state.plant, plantURL: img },
    });
  };

  handleUpdateCancel = () => {
    this.setState({
      plant: {
        name: '',
        description: '',
        location: '',
        plantURL: '',
      },
      searchPlant: '',
      apiUrl: 'https://api.unsplash.com/search/photos',
      apiKey:
        '48117950a0275f34c51b3ddc13c4aa1606f1f38218226bfa626297fe80c98d6b',
      amount: 1,
      images: [],
    });

    this.props.cancelUpdate();
    this.props.history.push('/');
  };

  handleSubmit = e => {
    e.preventDefault();
    const userId = localStorage.getItem('userId');
    const intervalValue = this.state.selectedOption
      ? this.state.selectedOption.value
      : null;

    const newPlant = {
      ...this.state.plant,
      userId,
      startDate: this.state.startDate,
      interval: Number(intervalValue),
    };
    console.log('\n newPlant', newPlant);
    this.props.activePlant
      ? this.props.updatePlant(this.props.activePlant.id, newPlant).then(() => {
          this.props.history.push('/');
        })
      : this.props.addPlant(newPlant).then(() => {
          this.props.history.push('/');
        });
    this.setState({
      plant: {
        name: '',
        searchPlant: '',
        location: '',
        description: '',
        plantURL: '',
      },
    });
  };

  handleDateChange = date => {
    this.setState({
      startDate: new Date(date),
    });
  };

  handleSelectChange = selectedOption => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  };

  render() {
    return (
      <Wrapper>
        <Container>
          <H1>{this.props.activePlant ? 'update plant' : 'add plant'}</H1>
          <form onSubmit={this.handleSubmit}>
            <div className="input-field">
              <label>plant name</label>
              <input
                type="text"
                name="name"
                value={this.state.plant.name}
                onChange={this.changeHandler}
              />
            </div>

            <div className="input-field">
              <label>location</label>
              <input
                type="text"
                name="location"
                value={this.state.plant.location}
                onChange={this.changeHandler}
              />
            </div>

            <div className="input-field">
              <label>description</label>
              <textarea
                className="materialize-textarea"
                name="description"
                value={this.state.plant.description}
                onChange={this.changeHandler}
              />
            </div>

            <WaterSchedule>
              <div
                className="input-field"
                style={{
                  width: '200px',
                  position: 'relative',
                  bottom: '8px',
                }}
              >
                <div
                  style={{
                    color: '#9e9e9e',
                    fontSize: '.8rem',
                    position: 'relative',
                    top: '20px',
                    left: '5px',
                    zIndex: '100',
                  }}
                >
                  select watering schedule
                </div>
                <Select
                  value={this.state.selectedOption}
                  onChange={this.handleSelectChange}
                  options={options}
                />
              </div>

              <div className="input-field">
                <WaterDateTime>
                  <label>select start date</label>
                  <DatePicker
                    selected={this.state.startDate}
                    onChange={this.handleDateChange}
                    showTimeSelect
                    timeIntervals={5}
                    dateFormat="MMM d, yyyy h:mm aa"
                    withPortal
                  />
                </WaterDateTime>
              </div>
            </WaterSchedule>

            <div className="input-field">
              <input
                type="text"
                name="searchPlant"
                value={this.state.searchPlant}
                onChange={this.searchChangeHandler}
                placeholder="Enter plant to search"
              />
            </div>

            <div className="image-select-container">
              <div className="imgSelectTitle">
                {this.state.images.length > 0 ? <h2>Select Image</h2> : null}
              </div>
              <div className="image-display">
                {this.state.images.length > 0 ? (
                  <ImageResults
                    className="image-card"
                    images={this.state.images}
                    selectImage={this.selectImage}
                  />
                ) : null}
              </div>
            </div>

            <button
              className="btn waves-effect btn-large teal darken-2"
              onClick={this.handleSubmit}
            >
              {this.props.activePlant ? 'update plant' : 'add plant'}
            </button>

            {this.props.activePlant ? (
              <button
                className="btn-large teal darken-2"
                onClick={this.handleUpdateCancel}
              >
                cancel
              </button>
            ) : (
              <div />
            )}
          </form>
        </Container>
      </Wrapper>
    );
  }
}

const mapStateToProps = state => ({
  addingPlant: state.addingPlant,
  activePlant: state.updateReducer.activePlant,
});

export default connect(
  mapStateToProps,
  { addPlant, updatePlant, cancelUpdate }
)(PlantForm);

//Styled Components

const Wrapper = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const Container = styled.div`
  max-width: 100%;
  padding: 10px;

  @media screen and (max-width: 420px) {
    display: flex;
    flex-direction: column;
  }
`;

const WaterSchedule = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1;

  @media screen and (max-width: 420px) {
    flex-direction: column;
  }
`;

const WaterDateTime = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #00796b;
  border-radius: 5px;
  padding: 5px;
`;

const H1 = styled.h1`
  color: #00796b;

  @media screen and (max-width: 420px) {
    margin: 1.2rem 0 .8rem 0;
  }
`;
