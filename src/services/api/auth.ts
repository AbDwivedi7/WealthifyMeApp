import api from './base';
import AsyncStorage from '@react-native-async-storage/async-storage';
const jwt_decode = require('jwt-decode').default;

export const sendOtp = async (mobileNumber: string) => {
  try {
    const response = await api.post('/sendotp', { mobileNumber });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const verifyOtp = async (mobileNumber: string, otp: string) => {
  try {
    const response = await api.post('/verifyotp', { mobileNumber, otp });
    const { token, refreshToken } = response.data;
    await AsyncStorage.setItem('token', token);
    await AsyncStorage.setItem('refreshToken', refreshToken);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const isTokenExpired = (token: string): boolean => {
  try {
    const decodedToken: any = jwt_decode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime;
  } catch (error) {
    return true; // If decoding fails, assume token is expired
  }
};

export const refreshToken = async () => {
  try {
    const refreshToken = await AsyncStorage.getItem('refreshToken');
    if (!refreshToken) throw new Error('No refresh token found');

    // Decode the refresh token to check expiry
    const decodedToken: any = jwt_decode(refreshToken);
    const currentTime = Date.now() / 1000;
    if (decodedToken.exp < currentTime) {
      throw new Error('Refresh token expired');
    }

    const response = await api.post('/refresh', { refreshToken });
    const { token, newRefreshToken } = response.data;
    await AsyncStorage.setItem('token', token);
    await AsyncStorage.setItem('refreshToken', newRefreshToken);
    return token;
  } catch (error) {
    throw error;
  }
};

export const createProfile = async (name: string, gender: string) => {
  try {
    const response = await api.post('/createprofile', { name, gender });
    return response.data;
  } catch (error) {
    throw error;
  }
}; 