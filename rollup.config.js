import path from 'path'

import config from './packages/rollup-config/config'

export default config({
  input: path.resolve('packages/rollup-config/config.js'),
})
