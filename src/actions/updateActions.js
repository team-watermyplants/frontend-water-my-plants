import axios from 'axios';

export const UPDATE_IN_PROGRESS = 'UPDATE_IN_PROGRESS';
export const UPDATE_PLANT_SUCCESS = 'UPDATE_PLANT_SUCCESS';
export const UPDATE_PLANT_FAILURE = 'UPDATE_PLANT_FAILURE';
export const CREATE_UPDATE_FORM = 'CREATE_UPDATE_FORM'

export const handleUpdate = plant => dispatch => {
    return dispatch({
        type: CREATE_UPDATE_FORM,
        payload: plant
    })
}

export const updatePlant = id => dispatch => {

    dispatch({ type: UPDATE_IN_PROGRESS });

    axios
        .put(`https://api-plants.herokuapp.com/plants/${id}`)
        .then(res => {
            dispatch({
                type: UPDATE_PLANT_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: UPDATE_PLANT_FAILURE,
                payload: err
            })
        })
}