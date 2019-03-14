import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import { debounce } from 'lodash';
import 'react-datepicker/dist/react-datepicker.css';
import { addPlant, updatePlant, cancelUpdate } from '../../actions';

import ImageResults from '../ImageResults';

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
      apiKey:
        '48117950a0275f34c51b3ddc13c4aa1606f1f38218226bfa626297fe80c98d6b',
      amount: 1,
      images: [],
      startDate: new Date(),
    };
  }

  componentDidMount = () => {
    if (this.props.activePlant) {
      this.setState({
        plant: this.props.activePlant,
      });
    }
  };

  searchChangeHandler = e => {
    let val = e.target.value;
    this.setState({ [e.target.name]: val }, () => {
      val === ''
        ? this.setState({ images: [] })
        : axios
            .get(
              `${this.state.apiUrl}/?client_id=${
                this.state.apiKey
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
      searchPlant: 'Plant image selected!',
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
    console.log('\nid', userId);
    const newPlant = {
      ...this.state.plant,
      userId,
      startDate: this.state.startDate,
    };
    console.log(newPlant);
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
    console.log(date);
    this.setState({
      startDate: date,
    });
  };

  render() {
    return (
      <div>
        <h1>{this.props.activePlant ? 'update plant' : 'add plant'}</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="name"
            value={this.state.plant.name}
            onChange={this.changeHandler}
            placeholder="Plant Name ex. English Ivy, Ficus, etc"
          />
          <br />
          <input
            type="text"
            name="location"
            value={this.state.plant.location}
            onChange={this.changeHandler}
            placeholder="Location ex. Living room, kitchen, etc."
          />
          <br />
          <input
            type="text"
            name="description"
            value={this.state.plant.description}
            onChange={this.changeHandler}
            placeholder="Describe your plant"
          />
          <br />
          <select>
            <option>Every Day</option>
            <option>Every Other Day</option>
          </select>
          <br />
          <DatePicker
            selected={this.state.startDate}
            onChange={this.handleDateChange}
            showTimeSelect
          />
          <br />
          <input
            type="text"
            name="searchPlant"
            value={this.state.searchPlant}
            onChange={this.searchChangeHandler}
            placeholder="Enter plant to search"
          />
          {this.state.images.length > 0 ? (
            <ImageResults
              images={this.state.images}
              selectImage={this.selectImage}
            />
          ) : null}
          <br />
          <button onClick={this.handleSubmit}>
            {this.props.activePlant ? 'update plant' : 'add plant'}
          </button>
          {this.props.activePlant ? (
            <button onClick={this.handleUpdateCancel}>cancel</button>
          ) : (
            <div />
          )}
        </form>
      </div>
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
