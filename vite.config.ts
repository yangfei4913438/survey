import react from '@vitejs/plugin-react';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, type PluginOption } from 'vite';
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
  },
  server: {
    // 代理设置查看 https://cn.vitejs.dev/config/server-options.html#server-proxy
    proxy: {
      // 访问 /api/test 等价于访问 http://localhost:6001/api/test
      '/api': {
        target: 'http://localhost:6001/',
        changeOrigin: true,
      },
    },
    port: 5001,
  },
  plugins: [
    react(),
    eslint(),
    visualizer({
      template: 'treemap',
      open: true,
      gzipSize: true,
      brotliSize: true,
      filename: 'analyse.html', // will be saved in project's root
    }) as PluginOption,
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // 映射的目录必须以/开头，表示根目录
    },
  },
});
