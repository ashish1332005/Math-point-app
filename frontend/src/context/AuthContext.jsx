import React, { createContext, useEffect, useState } from 'react';
import api from '../services/api';
import { generateDeviceId, getDeviceInfo } from '../utils/DeviceFingerprint';

export const AuthContext = createContext();

const getApiErrorMessage = (error, fallback) => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }

  if (error.request) {
    return 'Cannot reach the server. Please check the API URL, backend deployment, and CORS settings.';
  }

  return fallback;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Register device session after login
  const registerDeviceSession = async () => {
    try {
      const deviceId = await generateDeviceId();
      const deviceInfo = getDeviceInfo();
      const res = await api.post('/session/register', { deviceId, deviceInfo });
      if (res.data.sessionToken) {
        localStorage.setItem('mp_session_token', res.data.sessionToken);
      }
    } catch (error) {
      console.error('Device registration failed:', error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const res = await api.get('/auth/profile');
          setUser(res.data);
        } catch (_error) {
          localStorage.removeItem('token');
          localStorage.removeItem('mp_session_token');
        }
      }

      setLoading(false);
    };

    fetchUser();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await api.post('/auth/login', { email: email.trim(), password });
      
      if (res.data.require2FA) {
        return res.data;
      }

      const { token, ...userData } = res.data;
      localStorage.setItem('token', token);
      setUser(userData);

      // Register device after successful login
      await registerDeviceSession();

      return userData;
    } catch (error) {
      throw getApiErrorMessage(error, 'Login failed');
    }
  };

  const verify2FA = async (userId, code) => {
    try {
      const normalizedUserId = String(userId || '').trim();
      const normalizedCode = String(code || '').replace(/\D/g, '');

      const res = await api.post('/auth/verify-login-2fa', {
        userId: normalizedUserId,
        code: normalizedCode,
      });
      const { token, ...userData } = res.data;
      localStorage.setItem('token', token);
      setUser(userData);

      // Register device after 2FA verification
      await registerDeviceSession();

      return userData;
    } catch (error) {
      throw getApiErrorMessage(error, 'Verification failed');
    }
  };

  const register = async (payload) => {
    try {
      const res = await api.post('/auth/register', {
        ...payload,
        email: payload.email.trim(),
        parentEmail: payload.parentEmail.trim(),
      });
      const { token, ...userData } = res.data;
      localStorage.setItem('token', token);
      setUser(userData);

      // Register device after registration
      await registerDeviceSession();

      return userData;
    } catch (error) {
      throw getApiErrorMessage(error, 'Registration failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('mp_session_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, verify2FA, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
