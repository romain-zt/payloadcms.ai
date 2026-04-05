import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: false,
  clean: true,
  treeshake: true,
  external: ['payload', 'react', 'react-dom'],
  esbuildOptions(options) {
    options.conditions = ['module']
  },
})
