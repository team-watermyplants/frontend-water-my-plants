import axios from "axios";

export const REQUEST_IN_PROGRESS = "REQUEST_IN_PROGRESS";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";

export const login = creds => dispatch => {
  console.log('logging in')

  dispatch({
    type: REQUEST_IN_PROGRESS
  });
  return axios.post("https://api-plants.herokuapp.com/auth/login", creds)
    .then(res => {
      localStorage.setItem("token", res.data.token);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          userInfo: res.data.user
        }
      });
    })
    .catch(err => console.log("error: ", err));
};
