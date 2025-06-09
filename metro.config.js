const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

const config = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  resolver: {
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
};

module.exports = mergeConfig(defaultConfig, config);