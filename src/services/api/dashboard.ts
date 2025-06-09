import api from './base';

export const fetchDashboard = async () => {
  try {
    const response = await api.get('/dashboard');
    return response.data;
  } catch (error) {
    throw error;
  }
}; 