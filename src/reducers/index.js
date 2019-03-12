import { login } from "./login";
import { signUp } from "./signUp";
import { listReducer } from "./listReducer";
import { combineReducers } from "redux";
import { plantReducer } from "./plantReducer";
import { deletePlantReducer } from "./deletePlantReducer";
import { updateReducer } from "./updateReducer";

export default combineReducers({
  listReducer,
  plantReducer,
  login,
  signUp,
  deletePlantReducer,
  updateReducer
});
