import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import './Modal.css';
import SignUpForm from './SignUpForm';
import LoginForm from './LoginForm';
import { CREATE_USER, LOGIN_USER } from '../utils/mutations';

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
      console.error('Error:', error);
    }
  };

  const handleLogin = async (userData) => {
    try {
      const { data } = await loginUser({
        variables: { ...userData },
      });

      console.log('User logged in:', data.login.user);
      localStorage.setItem('token', data.login.token);
      onClose();
    } catch (error) {
      console.error('Error:', error);
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
        {isSignUp ? (
          <SignUpForm onSignUp={handleSignUp} />
        ) : (
          <LoginForm onLogin={handleLogin} />
        )}
        <button onClick={() => setIsSignUp(!isSignUp)}>
          {isSignUp ? 'Login' : 'Sign Up'}
        </button>
      </div>
    </div>
  );
};

export default Modal;