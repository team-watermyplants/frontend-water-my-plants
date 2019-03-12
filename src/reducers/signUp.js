import { REQUEST_IN_PROGRESS, SIGN_UP_SUCCESS } from "../actions";

const initialState = {
  communicating: false,
  userInfo: null
};

export const signUp = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_IN_PROGRESS:
      return {
        ...state,
        communicating: true
      };
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        communicating: false,
        userInfo: action.payload
      };
    default:
      return state;
  }
};
