import type { Theme } from '@react-navigation/native';

export const theme = {
  colors: {
    background: '#fff',
    primary: '#007AFF',
    text: '#222',
  },
  navigation: {
    dark: false,
    colors: {
      background: '#fff',
      card: '#fff',
      text: '#222',
      border: '#ccc',
      notification: '#007AFF',
      primary: '#007AFF',
    },
    fonts: {
      regular: { fontFamily: 'System', fontWeight: '400' },
      medium: { fontFamily: 'System', fontWeight: '500' },
      light: { fontFamily: 'System', fontWeight: '300' },
      thin: { fontFamily: 'System', fontWeight: '100' },
      bold: { fontFamily: 'System', fontWeight: '700' },
      heavy: { fontFamily: 'System', fontWeight: '900' },
    } as Theme['fonts'],
  },
}; 