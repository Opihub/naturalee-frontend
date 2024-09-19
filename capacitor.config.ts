import { type CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.naturalee.app',
  appName: 'Naturalee',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
