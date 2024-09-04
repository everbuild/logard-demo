import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/logard-demo',
  plugins: [vue()],
  resolve: {
    extensions: ['.js', '.ts', '.vue'],
  },
  build: {
    outDir: 'docs',
  },
});
