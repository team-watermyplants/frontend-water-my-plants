import React from "react";
import { connect } from "react-redux";
import axios from "axios";

import { addPlant, updatePlant } from "../../actions";

import ImageResults from "../ImageResults";

class PlantForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      plant: {
        name: "",
        description: "",
        location: "",
        plantURL: ""
      },
      searchPlant: "",
      apiUrl: "https://pixabay.com/api",
      apiKey: "11850512-34a79ee2d04c5d7e18f774944",
      amount: 5,
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

  changeHandler = e => {
    this.setState({
      plant: {
        ...this.state.plant,
        [e.target.name]: e.target.value
      }
    });
  };

  searchChangeHandler = e => {
    let val = e.target.value;
    this.setState({ [e.target.name]: val }, () => {
      if (val === "") {
        this.setState({ images: [] });
      } else {
        axios
          .get(
            `${this.state.apiUrl}/?key=${this.state.apiKey}
                        &q=${
                          this.state.searchPlant
                        }&image_type=photo&per_page=${this.state.amount}
                        &safesearch=true`
          )
          .then(res => {
            this.setState({ images: res.data.hits });
          })
          .catch(err => console.log(err));
      }
    });
  };

  selectImage = (e, img) => {
    e.preventDefault();
    this.setState({ plantURL: img });
    this.setState({ images: [], searchPlant: "Plant image selected!" });
  };

  handleSubmit = e => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");
    console.log("\nid", userId);
    const newPlant = {
      ...this.state.plant,
      userId
    };
    console.log(newPlant);
    this.props.activePlant
      ? this.props.updatePlant(this.props.activePlant.id, newPlant).then(() => {
          this.props.history.push("/");
        })
      : this.props.addPlant(newPlant).then(() => {
          this.props.history.push("/");
        });
    this.setState({
      plant: {
        name: "",
        searchPlant: "",
        location: "",
        description: "",
        plantURL: ""
      }
    });
  };

  render() {
    if (this.props.addingPlant) {
      return <div>Planting...</div>;
    }
    return (
      <div>
        <h1>{this.props.activePlant ? "update plant" : "add plant"}</h1>
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
  { addPlant, updatePlant }
)(PlantForm);
