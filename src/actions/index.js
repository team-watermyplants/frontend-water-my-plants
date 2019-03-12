
import axios from 'axios';

export { REQUEST_IN_PROGRESS, LOGIN_SUCCESS, login } from "./loginActions";
export { SIGN_UP_SUCCESS, createUser } from "./signUpActions";

export const ADD_PLANT_START = 'ADD_PLANT_START';
export const ADD_PLANT_SUCCESS = 'ADD_PLANT_SUCCESS';
export const ADD_PLANT_FAILURE = 'ADD_PLANT_FAILURE';

export const addPlant = newPlant => dispatch => {

    dispatch({ type: ADD_PLANT_START });

    axios
        .post('https://api-plants.herokuapp.com/plants', newPlant)
        .then(res => {
            dispatch({
                type: ADD_PLANT_SUCCESS,
                payload: console.log(res.data)
            })
        })
        .catch(err => {
            dispatch({
                type: ADD_PLANT_FAILURE,
                payload: err
            })
        })
}
