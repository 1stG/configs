import path from 'path'

import builtins from 'builtin-modules'

import config from './packages/rollup-config/config'
import pkg from './packages/rollup-config/package.json'

const FORMATS = ['cjs', 'esm', 'es2015']

const resolved = config({
  formats: FORMATS,
  input: path.resolve('packages/rollup-config/config.js'),
  outDir: '',
})

console.assert(Array.isArray(resolved))
console.assert(resolved.length === FORMATS.length)

const external = builtins.concat(
  Object.keys(pkg.peerDependencies),
  Object.keys(pkg.dependencies),
)

export default resolved.map(cfg => ({
  ...cfg,
  external,
}))
