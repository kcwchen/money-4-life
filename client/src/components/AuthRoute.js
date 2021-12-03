import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const AuthRoute = ({
  user,
  isAuthenticated,
  component: Component,
  ...routeProps
}) => {
  if (isAuthenticated) {
    return <Route {...routeProps} component={Component} user={user} />;
  } else {
    return <Redirect to='/sign_in' />;
  }
};

export default AuthRoute;
