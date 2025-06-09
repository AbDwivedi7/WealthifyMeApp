module.exports = {
  root: true,
  extends: ['@react-native', '@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
        '@typescript-eslint/no-unused-vars': 'warn',
        'react-native/no-inline-styles': 'warn',
        'react-hooks/exhaustive-deps': 'warn',
      },
    },
  ],
  rules: {
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'react-native/no-unused-styles': 'warn',
    'react-native/split-platform-components': 'warn',
    'react-native/no-color-literals': 'warn',
  },
};
