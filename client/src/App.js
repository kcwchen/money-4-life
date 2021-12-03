import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AuthContext from './context/auth-context';
import SignUpPage from './components/SignUpPage';
import SignInPage from './components/SignInPage';
import SignIn from './components/SignIn';
import BudgetIndexPage from './components/BudgetIndexPage';
import TransactionIndexPage from './components/TransactionIndexPage';
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
import { Flex } from '@chakra-ui/react';
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
        <Switch>
          <Route
            exact
            path='/'
            render={(routeProps) => (
              <SignIn {...routeProps} onSignIn={getCurrentUser} />
            )}
          />
          <Route
            exact
            path='/sign_up'
            render={(routeProps) => (
              <SignUpPage {...routeProps} onSignUp={getCurrentUser} />
            )}
          />
          <>
            <SideBar />
            <Flex w='100%' justifyContent='center'>
              {/* <NavBar currentUser={user} onSignOut={onSignOut} /> */}
              <Route
                exact
                path='/home'
                render={(routeProps) => (
                  <BudgetIndexPage {...routeProps} currentUser={user} />
                )}
              />
              <Route
                exact
                path='/transactions'
                component={TransactionIndexPage}
              />
            </Flex>
          </>
        </Switch>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;
