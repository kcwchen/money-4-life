import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AuthContext from './context/auth-context';
import SignInPage from './components/SignInPage';
import SignUpPage from './components/SignUpPage';
import BudgetIndexPage from './components/BudgetIndexPage';
import TransactionIndexPage from './components/TransactionIndexPage';
import SubscriptionIndexPage from './components/SubscriptionIndexPage';
import ReportIndexPage from './components/ReportIndexPage';
import SideBar from './components/SideBar';
import AuthRoute from './components/AuthRoute';
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
              <SignInPage {...routeProps} onSignIn={getCurrentUser} />
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
            <Flex width='100%'>
              <SideBar onSignOut={onSignOut} currentUser={user} />
              <Flex w='100%' justifyContent='center'>
                {/* <NavBar currentUser={user} onSignOut={onSignOut} /> */}
                <AuthRoute
                  exact
                  path='/home'
                  isAuthenticated={!!user}
                  user={user}
                  component={BudgetIndexPage}
                />
                <AuthRoute
                  exact
                  path='/transactions'
                  isAuthenticated={!!user}
                  user={user}
                  component={TransactionIndexPage}
                />
                <AuthRoute
                  exact
                  path='/subscriptions'
                  isAuthenticated={!!user}
                  user={user}
                  component={SubscriptionIndexPage}
                />
                <AuthRoute
                  exact
                  path='/reports'
                  isAuthenticated={!!user}
                  user={user}
                  component={ReportIndexPage}
                />
              </Flex>
            </Flex>
          </>
        </Switch>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;
