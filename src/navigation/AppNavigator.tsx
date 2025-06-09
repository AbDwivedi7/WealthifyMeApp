import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import AuthScreen from '../screens/AuthScreen';
import DashboardScreen from '../screens/DashboardScreen';
import { checkAuth } from '../store/authSlice';
import type { AppDispatch } from '../store';

export type RootStackParamList = {
  Splash: undefined;
  Auth: undefined;
  Main: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  console.log('AppNavigator loaded');
  const dispatch = useDispatch<AppDispatch>();
  const { loading, isAuthenticated } = useSelector((state: any) => state.auth);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    dispatch(checkAuth());
  }, []);

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => setShowSplash(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  if (loading || showSplash) {
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <Stack.Screen name="Main" component={DashboardScreen} />
      ) : (
        <Stack.Screen name="Auth" component={AuthScreen} />
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator; 