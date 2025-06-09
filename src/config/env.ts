import { Platform } from 'react-native';

const ENV = {
  dev: {
    API_URL: Platform.OS === 'android' ? 'http://10.0.2.2:3000/api' : 'http://localhost:3000/api',
  },
  staging: {
    API_URL: 'https://staging-api.yourdomain.com/api',
  },
  prod: {
    API_URL: 'https://api.yourdomain.com/api',
  },
};

type EnvType = 'dev' | 'staging' | 'prod';

const getEnvVars = (env: EnvType = 'dev') => {
  return ENV[env];
};

export default getEnvVars; 