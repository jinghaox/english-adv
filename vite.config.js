import { defineConfig } from 'vite';

// base './' 让构建产物可以部署在任意子路径下(例如 GitHub Pages)
export default defineConfig({
  base: './',
  server: { port: 5173 },
  build: { target: 'es2020' },
});
