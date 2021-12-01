import React from 'react';
import { NavLink } from 'react-router-dom';
import { Session } from '../requests';

const NavBar = (props) => {
  const { currentUser, onSignOut } = props;

  const handleSignOut = () => {
    Session.destroy().then(() => {
      onSignOut();
    });
  };

  return (
    <nav>
      <NavLink to='/'>Home</NavLink>|
      {currentUser ? (
        <>
          <NavLink to='budget'>My Budget</NavLink>|
          <button onClick={handleSignOut}>Sign Out</button>
        </>
      ) : (
        <>
          <NavLink to='sign_in'>Sign In</NavLink>|
          <NavLink to='sign_up'>Sign Up</NavLink>
        </>
      )}
    </nav>
  );
};

export default NavBar;
