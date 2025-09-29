import { defineConfig } from 'rollup'
import vue from 'rollup-plugin-vue'
import dts from 'rollup-plugin-dts'
import typescript from '@rollup/plugin-typescript'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import pkg from './package.json' assert { type: 'json' }

export default defineConfig([
  {
    input: 'src/index.ts',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        exports: 'named',
      },
      {
        file: pkg.module,
        format: 'es',
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      vue({ target: 'browser' }),
      typescript({ tsconfig: './tsconfig.json', declaration: false }),
    ],
    external: ['vue'],
  },
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/supreme-visual-effects.d.ts',
      format: 'es',
    },
    plugins: [dts()],
    external: ['vue'],
  },
])
