import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { addPlant } from '../../actions';

import ImageResults from '../ImageResults';

class PlantForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            plantName: '',
            searchPlant:'',
            description: '',
            location: '',
            apiUrl: 'https://pixabay.com/api',
            apiKey: '11850512-34a79ee2d04c5d7e18f774944',
            amount: 5,
            selectedImage: '',
            images: []
        }
    }

    changeHandler = e => {
        this.setState({[e.target.name]: e.target.value })
    }

    searchChangeHandler = e => {
        let val = e.target.value;
        this.setState({[e.target.name]: val }, () => {
            if (val === '') {
                this.setState({images: []});
            } else {
                axios
                    .get(`${this.state.apiUrl}/?key=${this.state.apiKey}
                        &q=${this.state.searchPlant}&image_type=photo&per_page=${this.state.amount}
                        &safesearch=true`)
                    .then(res => {
                        this.setState({images: res.data.hits})})
                    .catch(err => console.log(err));
            }
        });
    }

    selectImage = (e, img) => {
        e.preventDefault();
        this.setState({selectedImage: img})
        this.setState({images: [], searchPlant: 'Plant image selected!'})
    }

    handleSubmit = e => {
        e.preventDefault();
        const userId = localStorage.getItem('user id')
        console.log('\nid', userId)
        const newPlant = {
            name: this.state.plantName,
            location: this.state.location,
            description: this.state.description,
            plantURL: this.state.selectedImage,
            userId
        }
        this.props.addPlant(newPlant);

        this.setState({
            plantName: '',
            searchPlant: '',
            location: '',
            description: '',
            selectedImage: '',
        })
    }

    render() {

        if (this.props.addingPlant) {
            return (
                <div>Planting...</div>
            )
        }
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
    }
}

const mapStateToProps = state => ({
    addingPlant: state.addingPlant
});

export default connect(mapStateToProps, { addPlant })(PlantForm);