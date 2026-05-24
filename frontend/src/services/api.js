import axios from 'axios';

// Ensure the base URL is clean and points to the correct backend
const getBaseURL = () => {
  const envUrl = import.meta.env.VITE_API_BASE_URL;
  if (envUrl) return envUrl;

  // Default to production Render URL if not specified
  return 'https://math-point-app.onrender.com/api';
};

export const API_BASE_URL = getBaseURL();

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: Number(import.meta.env.VITE_API_TIMEOUT_MS) || 120000, // Render free instances can need a long cold start.
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to add the JWT token and session token automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Attach session token for device validation
    const sessionToken = localStorage.getItem('mp_session_token');
    if (sessionToken) {
      config.headers['X-Session-Token'] = sessionToken;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
