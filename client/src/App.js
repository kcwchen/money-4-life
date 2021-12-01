import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AuthContext from './context/auth-context';
import SignUpPage from './components/SignUpPage';
import SignInPage from './components/SignInPage';
import BudgetIndexPage from './components/BudgetIndexPage';
import TransactionIndexPage from './components/TransactionIndexPage';
import NavBar from './components/NavBar';
import { User } from './requests';
import './App.css';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getCurrentUser();
  }, []);

  const getCurrentUser = () => {
    return User.current().then((user) => {
      if (user?.id) {
        setUser(user);
      }
    });
  };

  const onSignOut = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user: user }}>
      <BrowserRouter>
        <NavBar currentUser={user} onSignOut={onSignOut} />
        <Switch>
          <Route
            exact
            path='/sign_up'
            render={(routeProps) => (
              <SignUpPage {...routeProps} onSignUp={getCurrentUser} />
            )}
          />
          <Route
            exact
            path='/sign_in'
            render={(routeProps) => (
              <SignInPage {...routeProps} onSignIn={getCurrentUser} />
            )}
          />
          <Route
            exact
            path='/budget'
            render={(routeProps) => (
              <BudgetIndexPage {...routeProps} currentUser={user} />
            )}
          />
          <Route exact path='/transactions' component={TransactionIndexPage} />
        </Switch>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;
