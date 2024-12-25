import React, { createContext, useState, useEffect } from 'react';

// Create the AuthContext
export const AuthContext = createContext();

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
  // Initialize state with values from localStorage
  const [auth, setAuth] = useState({
    token: localStorage.getItem('token') || null,
    username: localStorage.getItem('username') || null,
  });

  // Function to handle login
  const login = (token, username) => {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    setAuth({ token, username });
  };

  // Function to handle logout
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setAuth({ token: null, username: null });
  };

  // Effect to synchronize auth state with localStorage changes (optional)
  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem('token');
      const username = localStorage.getItem('username');
      setAuth({ token, username });
    };

    window.addEventListener('storage', handleStorageChange);

    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
