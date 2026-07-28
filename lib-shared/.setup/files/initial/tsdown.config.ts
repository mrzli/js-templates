import { defineConfig } from 'tsdown';

export default defineConfig({
  platform: 'neutral',
  target: 'es2025',
  dts: {
    tsgo: true,
  },
  exports: true,
  deps: {
    neverBundle: true,
  },
});
