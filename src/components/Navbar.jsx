import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Navbar = () => {
  const { auth, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <nav>
      <ul style={{ display: 'flex', listStyle: 'none', gap: '1rem' }}>
        <li><Link to="/">Home</Link></li>
        {auth.token ? (
          <>
            <li>Hello, {auth.username}!</li>
            <li>
              <button 
                onClick={handleLogout} 
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  cursor: 'pointer', 
                  padding: 0, 
                  color: 'blue', 
                  textDecoration: 'underline',
                  font: 'inherit'
                }}
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li><Link to="/signup">Signup</Link></li>
            <li><Link to="/login">Login</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
