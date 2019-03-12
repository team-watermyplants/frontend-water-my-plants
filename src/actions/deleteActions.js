import axios from 'axios';

export const DELETE_IN_PROGRESS = 'DELETE_IN_PROGRESS';
export const DELETE_PLANT_SUCCESS = 'DELETE_PLANT_SUCCESS';

export const deletePlant = id => dispatch => {

    dispatch({ type: DELETE_IN_PROGRESS });

    axios
        .delete(`https://api-plants.herokuapp.com/plants/${id}`)
        .then(res => {
            dispatch({
                type: DELETE_PLANT_SUCCESS,
                payload: res.data
            })
        .catch(err => console.log("err: ", err));
        })
}