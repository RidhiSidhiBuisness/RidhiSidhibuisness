import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    isAdmin: false,
    user: null
  });

  useEffect(() => {
    const storedAuth = localStorage.getItem('ridhi-sidhi-auth');
    if (storedAuth) {
      const auth = JSON.parse(storedAuth);
      // Check if session is still valid (24 hours)
      const sessionTime = new Date(auth.timestamp);
      const now = new Date();
      const hoursDiff = (now.getTime() - sessionTime.getTime()) / (1000 * 60 * 60);
      
      if (hoursDiff < 24) {
        setAuthState(auth);
      } else {
        localStorage.removeItem('ridhi-sidhi-auth');
      }
    }
  }, []);

  const login = (email, password) => {
    // Admin credentials
    const adminEmail = 'ridhisidhigarmentcollection@gmail.com';
    const adminPassword = 'RidhiSidhiGarments';

    if (email === adminEmail && password === adminPassword) {
      const authData = {
        isAuthenticated: true,
        isAdmin: true,
        user: { email },
        timestamp: new Date().toISOString()
      };
      
      setAuthState(authData);
      localStorage.setItem('ridhi-sidhi-auth', JSON.stringify(authData));
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setAuthState({
      isAuthenticated: false,
      isAdmin: false,
      user: null
    });
    localStorage.removeItem('ridhi-sidhi-auth');
  };

  return {
    ...authState,
    login,
    logout
  };
};