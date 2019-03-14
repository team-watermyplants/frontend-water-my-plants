import axios from "axios";

export const LOGIN_IN_PROGRESS = "LOGIN_IN_PROGRESS";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

export const login = creds => dispatch => {
  console.log("logging in");

  dispatch({
    type: LOGIN_IN_PROGRESS
  });
  return axios
    .post("https://api-watermyplants.herokuapp.com/auth/login", creds)
    .then(res => {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.user.id);
      dispatch({
        type: LOGIN_SUCCESS
      });
    })
    .catch(err => {
      dispatch({
        type: LOGIN_FAILURE
      })
      console.log("error: ", err)
    });
};