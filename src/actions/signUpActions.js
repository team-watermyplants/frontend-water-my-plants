import { REQUEST_IN_PROGRESS } from "./index";
import axios from "axios";

export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";

export const createUser = userInfo => dispatch => {
  console.log(userInfo);
  dispatch({
    type: REQUEST_IN_PROGRESS
  });
  return axios
    .post("https://api-plants.herokuapp.com/auth/register", userInfo)
    .then(res => {
      localStorage.setItem("token", res.data.token);
      dispatch({
        type: SIGN_UP_SUCCESS
      });
    })
    .catch(err => console.log(err));
};
