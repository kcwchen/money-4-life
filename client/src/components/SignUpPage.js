import React from 'react';
import { User } from '../requests';

const SignUpPage = (props) => {
  const { onSignUp } = props;
  console.log(props);

  const handleSignUp = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const params = {
      email: formData.get('email'),
      password: formData.get('password'),
      password_confirmation: formData.get('password_confirmation'),
    };
    User.create(params).then((user) => {
      if (user?.id) {
        onSignUp();
        props.history.push('/');
      }
    });
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSignUp}>
        <div>
          <label htmlFor='email'>Email</label>
          <input type='email' name='email' id='email' />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input type='password' name='password' id='password' />
        </div>
        <div>
          <label htmlFor='password_confirmation'>Password Confirmation</label>
          <input
            type='password'
            name='password_confirmation'
            id='password_confirmation'
          />
        </div>
        <input type='submit' value='Sign Up' />
      </form>
    </div>
  );
};

export default SignUpPage;
