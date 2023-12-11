// UserAuthentication.js
import React, { useState } from 'react';
import authService from '../services/authService';
import '../../styles/UserAuthentication.css';
import { useNavigate } from 'react-router-dom';

const UserAuthentication = ({ onUserLogin }) => {
  const [userUsername, setUserUsername] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loginStatusMessage, setLoginStatusMessage] = useState('');
  const navigate = useNavigate();

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const handleUserLogin = async () => {
    try {
      const token = await authService.userLogin(userUsername, userPassword);
      onUserLogin(token, userUsername);
      navigate('/dashboard');
    } catch (error) {
      console.error('User login failed', error);
      setLoginStatusMessage('Oops! Login Failed. Please Double-Check Your Username and Password.');
      openLoginModal(); 
    }
  };
  
  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };



  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="login-heading">User Login</h2>
        <input
          className="login-input"
          type="text"
          placeholder="Username"
          value={userUsername}
          onChange={(e) => setUserUsername(e.target.value)}
        />
        <input
          className="login-input"
          type="password"
          placeholder="Password"
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
        />
        <button className="login-button" onClick={handleUserLogin}>
          Log In
        </button>
      </div>
      <div className={`login-modal ${isLoginModalOpen ? 'modal-open' : ''}`}>
        <div className="modal-content">
          <h2>{loginStatusMessage}</h2>
          <button className="modal-button" onClick={closeLoginModal}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserAuthentication;
