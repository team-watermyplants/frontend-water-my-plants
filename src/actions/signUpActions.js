import axios from "axios";

export const SIGNUP_IN_PROGRESS = 'SIGNUP_IN_PROGRESS'
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";

export const createUser = userInfo => dispatch => {
  console.log(userInfo);
  dispatch({
    type: SIGNUP_IN_PROGRESS
  });
  return axios
    .post("https://api-watermyplants.herokuapp.com/auth/register", userInfo)
    .then(res => {
      console.log(res);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.user.id);
      dispatch({
        type: SIGN_UP_SUCCESS
      });
    })
    .catch(err => console.log(err));
};
