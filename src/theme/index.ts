import type { Theme } from '@react-navigation/native';

export const colors = {
  primary: '#6C47FF',
  secondary: '#007AFF',
  background: '#fff',
  text: '#222',
  buttonTextPrimary: '#fff',
  buttonTextSecondary: '#fff',
  border: '#e0e0e0',
  card: '#fff',
  notification: '#007AFF',
  disabled: '#bbb',
};

export const theme = {
  colors: {
    background: colors.background,
    primary: colors.primary,
    text: colors.text,
  },
  navigation: {
    dark: false,
    colors: {
      background: colors.background,
      card: colors.card,
      text: colors.text,
      border: colors.border,
      notification: colors.notification,
      primary: colors.primary,
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