import React, { useState } from 'react';
import { Session } from '../requests';

const SignInPage = (props) => {
  const { onSignIn } = props;

  const handleSignIn = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const params = {
      email: formData.get('email'),
      password: formData.get('password'),
    };
    Session.create(params).then((user) => {
      if (user?.id) {
        onSignIn();
        props.history.push('/');
      }
    });
  };

  return (
    <div>
      <h1>Sign In</h1>
      <form onSubmit={handleSignIn}>
        <div>
          <label htmlFor='email'>Email</label>
          <input type='email' name='email' id='email' />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input type='password' name='password' id='password' />
        </div>
        <input type='submit' value='Sign In' />
      </form>
    </div>
  );
};

export default SignInPage;
