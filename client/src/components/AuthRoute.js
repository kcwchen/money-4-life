import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const AuthRoute = ({
  user,
  isAuthenticated,
  component: Component,
  ...routeProps
}) => {
  // if (isAuthenticated) {
  //   return <Route {...routeProps} component={component} user={user} />;
  // } else {
  //   return <Redirect to='/' />;
  // }
  return (
    <Route
      user={user}
      {...routeProps}
      render={(props) =>
        isAuthenticated === true ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )
      }
    />
  );
};

export default AuthRoute;
