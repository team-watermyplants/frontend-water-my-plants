import {
  ADD_PLANT_START,
  ADD_PLANT_SUCCESS,
  ADD_PLANT_FAILURE
} from "../actions";

const initialState = {
  addingPlant: false,
  plantList: [],
  error: ""
};

export const plantReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLANT_START:
      return {
        ...state,
        fetchList: true,
        error: ""
      };
    case ADD_PLANT_SUCCESS:
      return {
        ...state,
        fetchList: false,
        error: "",
        plantList: [...state.plantList, action.payload]
      };
    case ADD_PLANT_FAILURE:
      return {
        ...state,
        fetchList: false,
        error: action.payload
      };
    default:
      return state;
  }
};
