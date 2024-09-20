import React, { useState } from 'react';
import './LoginModal.css';
import { CREATE_USER } from '../utils/mutations';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';

const SignUpForm = ({ onSignUp }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [createUser, {error}] = useMutation(CREATE_USER);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username && password) {
      try { 
        const {data} = await createUser({
          variables: {username, password}
        })
        console.log(data);
        Auth.login(data.createUser.token)
      } catch (err) {
        console.error(err)
      }
    } else {
      console.log('Sign Up:', { username, password });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="input-container">
        <label className="input-label">Username:</label>
        <input
          type="text"
          className="input-field"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="input-container">
        <label className="input-label">Password:</label>
        <input
          type="password"
          className="input-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="buttons-container">
        <button className="modal-button" type="submit">Sign Up</button>
      </div>
    </form>
  );
};

export default SignUpForm;