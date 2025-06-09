import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { colors } from '@/theme';

const SplashScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../assets/logo.json')}
        autoPlay
        loop
        style={styles.logo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#222',
  },
  spinner: {
    marginTop: 16,
  },
});

export default SplashScreen; 