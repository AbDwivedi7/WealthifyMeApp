/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Toast from 'react-native-toast-message';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';


import { store, persistor } from './src/store';
import AppNavigator from './src/navigation/AppNavigator';
import Loading from './src/components/common/Loading';
import { theme } from './src/theme';

const App: React.FC = () => {
  console.log('App component loaded');
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate
          loading={<Loading />}
          persistor={persistor}
          onBeforeLift={() => console.log('PersistGate before lift')}
        >
          <NavigationContainer theme={theme.navigation}>
            <StatusBar
              barStyle="dark-content"
              backgroundColor={theme.colors.background}
              translucent={false}
            />
            <AppNavigator />
            <Toast />
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
