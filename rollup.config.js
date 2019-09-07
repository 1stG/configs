import path from 'path'

import config from './packages/rollup-config/config'

const FORMATS = ['cjs', 'esm', 'es2015']

export default config({
  formats: FORMATS,
  input: path.resolve('packages/rollup-config/config.js'),
  outDir: '',
})
