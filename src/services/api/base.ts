import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { refreshToken, isTokenExpired } from './auth';
import getEnvVars from '../../config/env';

const { API_URL } = getEnvVars();

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async (config) => {
    let token = await AsyncStorage.getItem('token');
    if (token) {
      // Check if token is expired
      if (isTokenExpired(token)) {
        try {
          token = await refreshToken();
        } catch (error) {
          // If refresh fails, throw error to be handled in response interceptor
          throw error;
        }
      }
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newToken = await refreshToken();
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Handle refresh token failure (e.g., redirect to login)
        // Optionally, you can emit an event or use a global handler to redirect
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api; 