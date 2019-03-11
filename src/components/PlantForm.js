import React from 'react';
import axios from 'axios';

import ImageResults from './ImageResults';

class PlantForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            plantName: '',
            description: '',
            location: '',
            apiUrl: 'https://pixabay.com/api',
            apiKey: '11850512-34a79ee2d04c5d7e18f774944',
            amount: 5,
            image: '',
            images: []
        }
    }

    changeHandler = e => {
        const val = e.target.value;
        this.setState({[e.target.name]: val }, () => {
            if(val === '') {
                this.setState({images: []})
            } else {
            axios
                .get(`${this.state.apiUrl}/?key=${this.state.apiKey}
                    &q=${this.state.plantName}&image_type=photo&per_page=${this.state.amount}
                    &safesearch=true`)
                .then(res => {
                    this.setState({images: res.data.hits})})
                
                .catch(err => console.log(err));
            }
        })
    }

    selectImage = (e, img) => {
        e.preventDefault();
        this.setState({image: img})
    }

    render() {

        return (
            <div>
                <h1>Add new plant</h1>
                <form>
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
                    <button>Add Plant</button>
                    {this.state.images.length > 0 ? (
                        <ImageResults 
                            images={this.state.images}
                            selectImage={this.selectImage}
                            />): null}
                </form>
            </div>
        )
    } 
}

export default PlantForm