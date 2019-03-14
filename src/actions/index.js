import axios from "axios";

export { REQUEST_IN_PROGRESS, LOGIN_SUCCESS, login } from "./loginActions";
export { SIGN_UP_SUCCESS, createUser } from "./signUpActions";
export { PLANT_REQUEST_SUCCESS, getPlantList } from "./listActions";
export { handleUpdate, updatePlant, cancelUpdate } from "./updateActions";
export { deletePlant } from "./deleteActions";
export { getPlant } from "./plantActions";

export const ADD_PLANT_START = "ADD_PLANT_START";
export const ADD_PLANT_SUCCESS = "ADD_PLANT_SUCCESS";
export const ADD_PLANT_FAILURE = "ADD_PLANT_FAILURE";

export const addPlant = newPlant => dispatch => {
  dispatch({ type: ADD_PLANT_START });

  return axios
    .post("https://api-watermyplants.herokuapp.com/api/plants", newPlant)
    .then(res => {
      console.log(res.data);
      dispatch({
        type: ADD_PLANT_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: ADD_PLANT_FAILURE,
        payload: err
      });
    });
};


