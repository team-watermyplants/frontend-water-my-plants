import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import createHistory from 'history/createBrowserHistory'
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducer from "./reducers";
import thunk from "redux-thunk";
import logger from 'redux-logger'

import "./index.css";
import App from "./App";

const store = createStore(reducer, applyMiddleware(thunk, logger));
const history = createHistory

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
