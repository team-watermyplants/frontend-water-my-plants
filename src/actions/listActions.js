import axios from "axios";

import { REQUEST_IN_PROGRESS } from "./index";

export const PLANT_REQUEST_SUCCESS = "PLANT_REQUEST_SUCCESS";

export const getData = id => dispatch => {
  dispatch({
    type: REQUEST_IN_PROGRESS
  });
  axios
    .get(`https://api-plants.herokuapp.com/api/users/${id}/plants`)
    .then(res => {
      dispatch({
        type: PLANT_REQUEST_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => console.log("err: ", err));
};
