import { REQUEST_IN_PROGRESS } from "./index";
import axios from "axios";

export const getPlant = id => dispatch => {
  dispatch({
    type: REQUEST_IN_PROGRESS
  });
  return axios
    .get(`https://api-watermyplants.herokuapp.com/api/plants/${id}`)
    .then(res => {
      return {
        payload: res.data
      };
    })
    .catch(err => console.log(err));
};
