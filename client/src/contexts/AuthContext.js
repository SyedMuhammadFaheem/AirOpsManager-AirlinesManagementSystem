import React, { createContext, useContext, useState, useEffect } from 'react';
import apiClient from '../api/client';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({ role: null, username: null, client_id: null, loading: true });

  useEffect(() => {
    apiClient.get('/auth/me')
      .then((res) => setAuth({ ...res.data, loading: false }))
      .catch(() => setAuth({ role: null, username: null, client_id: null, loading: false }));
  }, []);

  const loginAdmin = async (username, password) => {
    await apiClient.post('/auth/login', { username, password });
    const res = await apiClient.get('/auth/me');
    setAuth({ ...res.data, loading: false });
  };

  const loginCustomer = async (email, password) => {
    const res = await apiClient.post('/auth/customerlogin', { email, password });
    const me = await apiClient.get('/auth/me');
    setAuth({ ...me.data, loading: false });
    return res.data.user;
  };

  const logout = async () => {
    await apiClient.post('/auth/logout');
    setAuth({ role: null, username: null, client_id: null, loading: false });
  };

  return (
    <AuthContext.Provider value={{ auth, loginAdmin, loginCustomer, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
