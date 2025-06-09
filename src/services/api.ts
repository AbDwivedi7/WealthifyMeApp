import axios from 'axios';

const API_URL = 'https://your-api-url.com/api'; // Replace with your actual API URL

export const sendOtp = async (mobileNumber: string) => {
  try {
    const response = await axios.post(`${API_URL}/sendotp`, { mobileNumber });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const verifyOtp = async (mobileNumber: string, otp: string) => {
  try {
    const response = await axios.post(`${API_URL}/verifyotp`, { mobileNumber, otp });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createProfile = async (name: string, gender: string) => {
  try {
    const response = await axios.post(`${API_URL}/createprofile`, { name, gender });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchDashboard = async () => {
  try {
    const response = await axios.get(`${API_URL}/dashboard`);
    return response.data;
  } catch (error) {
    throw error;
  }
}; 