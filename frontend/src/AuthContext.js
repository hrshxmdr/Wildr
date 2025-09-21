// src/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import api from "./api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Try cookie-based session first
    (async () => {
      try {
        const { data } = await api.get('/auth/me');
        if (data) {
          setUser(data);
          setLoading(false);
          return;
        }
      } catch {}
      // Fallback to token in localStorage if present (older flow)
      const token = localStorage.getItem('token');
      const userJson = localStorage.getItem('user');
      if (token && userJson) {
        api.defaults.headers.common.Authorization = `Bearer ${token}`;
        setUser(JSON.parse(userJson));
      }
      setLoading(false);
    })();
  }, []);

  const login = async (username, password) => {
    const { data } = await api.post('/auth/login', { username, password });
    const token = data.token;
    const userData = data.user;
    localStorage.setItem('token', token);
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    // Store user data from response
    const minimalUser = { username: userData.username, email: userData.email };
    localStorage.setItem('user', JSON.stringify(minimalUser));
    setUser(minimalUser);
    return minimalUser;
  };

  const register = async (username, email, password) => {
    const { data } = await api.post('/auth/register', { username, email, password });
    const token = data.token;
    const userData = data.user;
    localStorage.setItem('token', token);
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    const minimalUser = { username: userData.username, email: userData.email };
    localStorage.setItem('user', JSON.stringify(minimalUser));
    setUser(minimalUser);
    return minimalUser;
  };

  const logout = async () => {
    try { await api.post('/auth/logout'); } catch {}
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete api.defaults.headers.common.Authorization;
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
