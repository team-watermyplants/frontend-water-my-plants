import {REQUEST_IN_PROGRESS} from '../actions'

const initialState = {
  communicating: false
};

export const login = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_IN_PROGRESS:
    console.log(action.payload)
    return{
      ...state,
      communicating: true
    }
    default:
      return state;
  }
};