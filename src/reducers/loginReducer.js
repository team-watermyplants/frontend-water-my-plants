import { LOGIN_IN_PROGRESS, LOGIN_SUCCESS, LOGIN_FAILURE } from "../actions";

const initialState = {
  communicating: false
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_IN_PROGRESS:
      return {
        ...state,
        communicating: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        communicating: false
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        communicating: false
      };
    default:
      return state;
  }
};
