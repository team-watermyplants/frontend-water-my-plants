import { REQUEST_IN_PROGRESS } from './index'
import axios from 'axios';

export const createUser = userInfo => dispatch => {
    dispatch({
        type: REQUEST_IN_PROGRESS
    })
    return axios.post('https://api-plants.herokuapp.com/auth.register', userInfo)
    .then(res => console.log(res))
    .catch(err => console.log(err))
}