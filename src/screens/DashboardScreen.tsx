import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from '../components/common/Button';
import { fetchDashboard } from '../services/api/dashboard';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import type { AppDispatch } from '../store';

const DashboardScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const data = await fetchDashboard();
        setDashboardData(data);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      }
    };
    loadDashboard();
  }, []);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Dashboard!</Text>
      <Text style={styles.subtitle}>Your personal finance dashboard is here.</Text>
      {dashboardData && <Text>Dashboard Data: {JSON.stringify(dashboardData)}</Text>}
      <Button title="Sign Out" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
});

export default DashboardScreen; 