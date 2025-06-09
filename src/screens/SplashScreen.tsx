import React from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet } from 'react-native';

const SplashScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
        onError={() => {}}
      />
      <Text style={styles.title}>WealthifyMe</Text>
      <ActivityIndicator size="large" color="#007AFF" style={styles.spinner} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
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