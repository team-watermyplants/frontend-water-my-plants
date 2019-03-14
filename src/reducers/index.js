import { loginReducer } from "./loginReducer";
import { signUpReducer } from "./signUpReducer";
import { listReducer } from "./listReducer";
import { combineReducers } from "redux";
import { plantReducer } from "./plantReducer";
import { deletePlantReducer } from "./deletePlantReducer";
import  { updateReducer } from "./updateReducer";

export default combineReducers({
  listReducer,
  plantReducer,
  loginReducer,
  signUpReducer,
  deletePlantReducer,
  updateReducer
});
