import react from '@vitejs/plugin-react';
import path from 'path';
import { loadEnv, type UserConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
import { configDefaults, defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default ({ mode }: UserConfig) => {
  process.env = { ...process.env, ...loadEnv(mode ?? 'development', process.cwd()) };

  return defineConfig({
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
    test: {
      // 使用类似 jest 中的全局 API
      globals: true,
      setupFiles: 'tests/libs/setup.ts',
      // 匹配排除测试文件的 glob 规则。
      exclude: [
        '**/node_modules/**',
        '**/dist/**',
        '**/.{idea,git,cache,output,temp}/**',
        'mock/*',
      ],
      // 匹配包含测试文件的 glob 规则。
      include: [...configDefaults.include, 'tests/files/**/*.test.ts?x'],
      useAtomics: true, // 同步线程
      environment: 'happy-dom',
      coverage: {
        reporter: ['text', 'json', 'html'],
      },
      typecheck: {
        tsconfig: './tsconfig.json',
      },
      deps: {
        inline: ['echarts'],
      },
    },
    plugins: [react(), eslint() as any],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'), // 映射的目录必须以/开头，表示根目录
      },
    },
  });
};
