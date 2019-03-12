import { login } from './login'
import { combineReducers } from 'redux';
import { plantReducer } from './plantReducer';

export default combineReducers ({
  plantReducer,
  login
});


