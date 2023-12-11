// AccountCreation.js
import React, { useState, useEffect } from 'react';
import authService from '../services/authService';
import '../../styles/AccountCreation.css';

const AccountCreation = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [signupStatus, setSignupStatus] = useState(null);

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await authService.userRegistration(fullName, username, password);
      setSignupStatus('success');
    } catch (error) {
      console.error('Signup failed', error);
      setSignupStatus('failed');
    }
  };

  useEffect(() => {
    const closeDialog = () => {
      setTimeout(() => setSignupStatus(null), 2000);
    };

    if (signupStatus === 'success') {
      closeDialog();
    } else if (signupStatus === 'failed') {
      closeDialog();
    }
  }, [signupStatus]);

  return (
    <div className="signup-container">
      <h2 className="signup-heading">Customer Registration</h2>
      <form className="signup-form" onSubmit={handleSignup}>
        <div className="signup-input-container">
          <label className="signup-label">Display Name:</label>
          <input
            className="signup-input"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className="signup-input-container">
          <label className="signup-label">User ID:</label>
          <input
            className="signup-input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="signup-input-container">
          <label className="signup-label">Secure Password:</label>
          <input
            className="signup-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="signup-button" type="submit">
          Register
        </button>

        {signupStatus === 'success' && (
          <div className="dialog success">
            Signup successful!
          </div>
        )}
        {signupStatus === 'failed' && (
          <div className="dialog error">Sorry, Signup Failed. Please Give It Another Try</div>
        )}
      </form>
    </div>
  );
};

export default AccountCreation;
