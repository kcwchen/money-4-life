import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const AuthRoute = ({ user, isAuthenticated, component, ...routeProps }) => {
  console.log(user);
  if (isAuthenticated) {
    return <Route {...routeProps} component={component} />;
  } else {
    return <Redirect to='/' />;
  }
};

export default AuthRoute;
