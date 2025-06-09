import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { colors } from '@/theme';

const Loading: React.FC = () => {
  console.log('Loading component rendered');
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.secondary} />
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
});

export default Loading; 