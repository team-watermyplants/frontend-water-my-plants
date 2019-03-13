import React from "react";
import { connect } from "react-redux";
import axios from "axios";

import { addPlant } from "../../actions";

import ImageResults from "../ImageResults";

class PlantForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      plant: {
        name: "",
        description: "",
        location: "",
        selectedImage: ""
      },
      searchPlant: "",
      apiUrl: 'https://api.unsplash.com/search/photos',
      apiKey: '48117950a0275f34c51b3ddc13c4aa1606f1f38218226bfa626297fe80c98d6b',
      amount: 1,
      images: []
    };
  }


  componentDidMount = () => {
    if (this.props.activePlant) {
      this.setState({
        plant: this.props.activePlant
      });
      console.log("its working");
    }
    console.log(this.props.activePlant);
  };


    searchChangeHandler = e => {
        let val = e.target.value;
        this.setState({[e.target.name]: val }, () => {
            if (val === '') {
                this.setState({images: []});
            } else {
                axios
                    .get(`${this.state.apiUrl}/?client_id=${this.state.apiKey}&query=${this.state.searchPlant}&page=${this.state.amount}`)
                    .then(res => {
                        this.setState({images: res.data.results})})
                    .catch(err => console.log(err));
            }
        });
    }

  selectImage = (e, img) => {
    e.preventDefault();
    this.setState({ selectedImage: img });
    this.setState({ images: [], searchPlant: "Plant image selected!" });
  };

  handleSubmit = e => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");
    console.log("\nid", userId);
    const newPlant = {
      name: this.state.plantName,
      location: this.state.location,
      description: this.state.description,
      plantURL: this.state.selectedImage,
      userId
    };
    this.props.addPlant(newPlant);

    this.setState({
      plant: {
        plantName: "",
        searchPlant: "",
        location: "",
        description: "",
        selectedImage: ""
      }
    });
  };

<<<<<<< HEAD
        if (this.props.addingPlant) {
            return (
                <div>Planting...</div>
            )
        }
        console.log('images', this.state.images)
        return (
            <div>
                <h1>Add new plant</h1>
                <form onSubmit={this.handleSubmit}>
                    <input 
                        type='text'
                        name='plantName'
                        value={this.state.plantName}
                        onChange={this.changeHandler}
                        placeholder='Plant Name ex. English Ivy, Ficus, etc'
                    />
                    <br />
                    <input 
                        type='text'
                        name='location'
                        value={this.state.location}
                        onChange={this.changeHandler}
                        placeholder='Location ex. Living room, kitchen, etc.'
                    />
                    <br />
                    <input
                        type='text'
                        name='description'
                        value={this.state.description}
                        onChange={this.changeHandler}
                        placeholder='Describe your plant'
                    />
                    <br />
                    <input
                        type='text'
                        name='searchPlant'
                        value={this.state.searchPlant}
                        onChange={this.searchChangeHandler}
                        placeholder='Enter plant to search'
                    />
                    {this.state.images.length > 0 ? (
                        <ImageResults
                            images={this.state.images}
                            selectImage={this.selectImage}
                            />): null}
                    <br />
                    <button>Add Plant</button>
                    
                </form>
            </div>
        )
=======
  render() {
    if (this.props.addingPlant) {
      return <div>Planting...</div>;
>>>>>>> 8e46d276e4052fe69fb3d5c758c324bcf6b2a7f2
    }
    return (
      <div>
        <h1>Add new plant</h1>
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
          <button onClick={this.handleSubmit}>Add Plant</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  addingPlant: state.addingPlant,
  activePlant: state.updateReducer.activePlant
});

export default connect(
  mapStateToProps,
  { addPlant }
)(PlantForm);
