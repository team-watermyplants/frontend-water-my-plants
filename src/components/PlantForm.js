import React from 'react';
import axios from 'axios';

class PlantForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            plantName: '',
            location: '',
            apiUrl: 'https://pixabay.com/api',
            apiKey: '11850512-34a79ee2d04c5d7e18f774944',
            amount: 5,
            images: []
        }
    }

    changeHandler = e => {
        this.setState({[e.target.name]: e.target.value}, () => {
            axios.get(`${this.state.apiUrl}/?key=${this.state.apiKey}
            &q=${this.state.plantName}&image_type=photo&per_page=${this.state.amount}
            &safesearch=true`)
            .then(res => this.setState({images: res.data.hits}))
            .catch(err => console.log(err));
        })
    }

    render() {
        return (
            <div>
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
                    <button>Add Plant</button>
                </form>
            </div>
        )
    } 
}

export default PlantForm