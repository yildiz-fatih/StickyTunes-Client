import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  // Form fields state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  // Feedback messages state
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessages, setErrorMessages] = useState([]);

  // Access auth context
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Reset messages
    setSuccessMessage('');
    setErrorMessages([]);

    // Basic front-end validation
    if (!username || !password) {
      setErrorMessages(['Please enter both username and password.']);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5129/api/accounts/login', {
        userName: username,
        password: password,
        rememberMe: rememberMe,
      });

      if (response.data.succeeded) {
        setSuccessMessage('Login successful! Redirecting to Home...');

        // Store token and username in auth context
        login(response.data.token, username);

        // Clear form fields
        setUsername('');
        setPassword('');
        setRememberMe(false);

        // Redirect to Home after a short delay
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        // Set error messages from API response
        setErrorMessages(response.data.errors || ['Login failed. Please try again.']);
      }
    } catch (error) {
      // Handle network or unexpected errors
      if (error.response && error.response.data && error.response.data.errors) {
        setErrorMessages(error.response.data.errors);
      } else {
        setErrorMessages(['An error occurred. Please try again.']);
      }
    }
  };

  return (
    <div>
      <h1>Login</h1>

      {/* Success Message */}
      {successMessage && (
        <div style={{ color: 'green', marginBottom: '1rem' }}>
          {successMessage}
        </div>
      )}

      {/* Error Messages */}
      {errorMessages.length > 0 && (
        <div role="alert" style={{ color: 'red', marginBottom: '1rem' }}>
          <ul>
            {errorMessages.map((msg, index) => (
              <li key={index}>{msg}</li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username:</label><br />
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label><br />
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            {' '}Remember Me
          </label>
        </div>

        <button type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
