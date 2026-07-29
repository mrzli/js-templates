import { fileURLToPath, URL } from 'node:url';

import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  oxc: false,
  resolve: {
    alias: {
      '#': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  plugins: [
    swc.vite({
      jsc: {
        target: 'es2024',
      },
      module: { type: 'es6' },
    }),
  ],
  test: {
    projects: [
      {
        extends: true,
        test: {
          name: 'unit',
          environment: 'node',
          include: ['src/**/*.test.ts', 'test/unit/**/*.test.ts'],
          setupFiles: ['./test/setup.ts'],
        },
      },
      {
        extends: true,
        test: {
          name: 'integration',
          environment: 'node',
          include: ['test/integration/**/*.test.ts'],
          setupFiles: ['./test/setup.ts'],
        },
      },
      {
        extends: true,
        test: {
          name: 'e2e',
          environment: 'node',
          include: ['test/e2e/**/*.test.ts'],
          setupFiles: ['./test/setup.ts'],
        },
      },
    ],
  },
});
