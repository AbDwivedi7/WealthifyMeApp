module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@': './src',
          '@/components': './src/components',
          '@/screens': './src/screens',
          '@/services': './src/services',
          '@/utils': './src/utils',
          '@/hooks': './src/hooks',
          '@/types': './src/types',
          '@/theme': './src/theme',
          '@/assets': './src/assets',
          '@/store': './src/store',
          '@/navigation': './src/navigation',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
