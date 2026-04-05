import { defineConfig } from 'tsup'

const shared = {
  format: ['cjs', 'esm'] as const,
  dts: true,
  splitting: false,
  sourcemap: false,
  treeshake: true,
  external: ['payload', 'react', 'react-dom'],
  esbuildOptions(options: import('esbuild').BuildOptions) {
    options.conditions = ['module']
  },
}

export default [
  defineConfig({
    ...shared,
    entry: ['src/index.ts'],
    clean: true,
  }),
  defineConfig({
    ...shared,
    entry: ['src/client.ts'],
    clean: false,
  }),
]
