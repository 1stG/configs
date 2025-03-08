/**
 * @import {ConfigFn, ConfigPlugin} from 'postcss-load-config
 */

import { NODE_ENV, __DEV__, __PROD__ } from '@pkgr/utils'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import import_ from 'postcss-import'
import modules_ from 'postcss-modules'
import normalize_ from 'postcss-normalize'
import presetEnv_ from 'postcss-preset-env'
import url_ from 'postcss-url'

/**
 *
 * @type {ConfigFn}
 */
const config = ({
  advanced,
  env = NODE_ENV,
  map,
  import: importOptions,
  modules,
  normalize,
  presetEnv,
  url,
  ...options
} = {}) => {
  /**
   * @type {ConfigPlugin[]}
   */
  const plugins = [
    presetEnv_(presetEnv),
    import_(importOptions),
    normalize_(normalize),
    url_(url),
    autoprefixer,
  ]

  if (modules) {
    plugins.push(
      modules_({
        globalModulePaths: [
          /[/\\]node_modules[/\\]/,
          /(\bglobals?[/\\][\w-]+|\.globals?)\.(p?css|less|s[ac]ss|styl(us)?)$/,
        ],
        generateScopedName: __PROD__
          ? '[hash:base64:10]'
          : '[path][name]__[local]---[hash:base64:5]',
        ...modules,
      }),
    )
  }

  if (__PROD__) {
    plugins.push(
      cssnano({
        preset: [
          advanced ? 'advanced' : 'default',
          {
            discardComments: {
              removeAll: true,
            },
          },
        ],
      }),
    )
  }

  return {
    ...options,
    env,
    map: __DEV__ && map,
    plugins,
  }
}

export default config
