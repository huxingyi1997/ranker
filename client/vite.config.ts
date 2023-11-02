import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: `http://${env.VITE_API_HOST}:${env.VITE_API_PORT}`,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
      port: 8080,
    },
    css: {
      modules: {
        localsConvention: 'camelCaseOnly',
      },
    },
  };
});
