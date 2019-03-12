import { REQUEST_IN_PROGRESS, LOGIN_SUCCESS } from "../actions";

const initialState = {
  communicating: false,
  userInfo: null
};

export const login = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_IN_PROGRESS:
      return {
        ...state,
        communicating: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        communicating: false,
        userInfo: action.payload
      };
    default:
      return state;
  }
};
