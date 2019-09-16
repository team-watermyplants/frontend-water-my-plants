import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  //TODO: Clean up this hackie social login implementation
  const search = window.location.search.split('=')
  // console.log('\n🦄',search)
  const token = search[1]
  const userIdQuery = search[2]
  if (token && userIdQuery) {
    localStorage.setItem('token', token)
    localStorage.setItem('userId', userIdQuery)
  }
  return (
    <Route
      {...rest}
      render={props =>
        localStorage.getItem('token') ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default ProtectedRoute;