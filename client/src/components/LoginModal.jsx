import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import './LoginModal.css';
import SignUpForm from './SignUpForm';
import LoginForm from './LoginForm';
import { CREATE_USER, LOGIN_USER } from '../utils/mutations';
import auth from '../utils/auth';

const Modal = ({ show, onClose }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [createUser] = useMutation(CREATE_USER);
  const [loginUser] = useMutation(LOGIN_USER);

  const handleSignUp = async (userData) => {
    try {
      const { data } = await createUser({
        variables: { ...userData },
      });

      console.log('User created:', data.createUser);
      setIsSignUp(false); 
    } catch (error) {
      console.error('Error during sign-up:', error);
    }
  };

  const handleLogin = async (userData) => {
    try {
      const { data } = await loginUser({
        variables: { ...userData },
      });

      console.log('User logged in:', data.login.user);
      auth.login(data.login.token);
      onClose(); 
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <h1 className="modal-title">{isSignUp ? 'Create User Profile' : 'Login'}</h1>
        
        {isSignUp ? (
          <SignUpForm onSignUp={handleSignUp} />
        ) : (
          <LoginForm onLogin={handleLogin} />
        )}

<div className="buttons-container">
  <button className="modal-button" onClick={() => setIsSignUp(!isSignUp)}>
    {isSignUp ? 'Login' : 'Sign Up'}
  </button>
</div>
      </div>
    </div>
  );
};

export default Modal;