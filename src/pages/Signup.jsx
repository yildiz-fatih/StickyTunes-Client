import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  // Form fields state
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Feedback messages state
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessages, setErrorMessages] = useState([]);

  const handleSignup = async (e) => {
    e.preventDefault();

    // Reset messages
    setSuccessMessage('');
    setErrorMessages([]);

    // Password match validation
    if (password !== confirmPassword) {
      setErrorMessages(['Passwords do not match.']);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5129/api/accounts/register', {
        fullName,
        userName: username,
        email,
        password,
        confirmPassword,
      });

      if (response.data.succeeded) {
        setSuccessMessage('Signup successful! You can now log in.');

        // Clear form fields
        setFullName('');
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      } else {
        // Set error messages from API response
        setErrorMessages(response.data.errors || ['Signup failed. Please try again.']);
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
      <h1>Signup</h1>

      {/* Success Message */}
      {successMessage && (
        <div style={{ color: 'green', marginBottom: '1rem' }}>
          {successMessage}
        </div>
      )}

      {/* Error Messages */}
      {errorMessages.length > 0 && (
        <div style={{ color: 'red', marginBottom: '1rem' }}>
          <ul>
            {errorMessages.map((msg, index) => (
              <li key={index}>{msg}</li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleSignup}>
        <div>
          <label>Name and Surname:</label><br />
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Username:</label><br />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Email:</label><br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Password:</label><br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Confirm Password:</label><br />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
