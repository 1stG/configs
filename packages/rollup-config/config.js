import fs from 'fs'
import path from 'path'

import builtins from 'builtin-modules'
import debug from 'debug'
import { flatMap } from 'lodash'
import alias from 'rollup-plugin-alias'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import json from 'rollup-plugin-json'
import postcss from 'rollup-plugin-postcss'
import replace from 'rollup-plugin-replace'
import nodeResolve from 'rollup-plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript'
import url from 'rollup-plugin-url'
import { getGlobals, normalizePkg, upperCamelCase } from '@pkgr/umd-globals'
import { namedExports } from '@pkgr/named-exports'

const info = debug('r:info')

const PRODUCTION = 'production'

const STYLE_EXTENSIONS = ['.css', '.less', 'sass', '.scss', '.styl', '.stylus']
const IMAGE_EXTENSIONS = ['.gif', '.jpeg', '.jpg', '.png', '.svg', '.webp']
const ASSETS_EXTENSIONS = STYLE_EXTENSIONS.concat(IMAGE_EXTENSIONS)

const BASIC_PLUGINS = [
  nodeResolve({
    mainFields: [
      'esnext',
      'es2015',
      'esm2015',
      'fesm2015',
      'esm5',
      'fesm5',
      'module',
      'main',
    ],
  }),
  commonjs({ namedExports }),
  json(),
  url({ include: IMAGE_EXTENSIONS }),
]

const DEFAULT_FORMATS = ['cjs', 'es2015', 'esm']

let isTsAvailable = false

try {
  isTsAvailable = !!require.resolve('typescript')
} catch (e) {}

// eslint-disable-next-line node/no-deprecated-api
const EXTENSIONS = Object.keys(require.extensions)

if (isTsAvailable) {
  EXTENSIONS.unshift('.ts', '.tsx')
}

const tryExtensions = filepath => {
  const ext = EXTENSIONS.find(ext => fs.existsSync(filepath + ext))
  return ext ? filepath + ext : filepath
}

const configBase = ({
  formats,
  monorepo,
  input,
  outputDir = 'lib',
  exports,
  externals = [],
  globals: umdGlobals,
  aliases = [],
  postcss: postcssOpts,
  prod = process.env.NODE_ENV === PRODUCTION,
} = {}) => {
  const pkgsPath = path.resolve(
    typeof monorepo === 'string' ? monorepo : 'packages',
  )

  if (monorepo !== false) {
    monorepo = fs.existsSync(pkgsPath)
  }

  const pkgs = monorepo ? fs.readdirSync(pkgsPath) : ['']

  const globals = getGlobals({
    globals: umdGlobals,
  })

  const configs = flatMap(pkgs, pkg => {
    const pkgPath = path.resolve(monorepo ? pkgsPath : '', pkg)
    const srcPath = path.resolve(pkgPath, 'src')

    let pkgInput = input
    let pkgOutputDir = outputDir

    if (!fs.existsSync(srcPath) && pkgInput == null) {
      pkgInput = 'index'
    }

    pkgInput = tryExtensions(path.resolve(pkgPath, pkgInput || 'src/index'))

    const isAbsolute = path.isAbsolute(pkgInput)

    if (pkgOutputDir && !pkgOutputDir.endsWith('/')) {
      pkgOutputDir = pkgOutputDir + '/'
    }

    if (
      !fs.existsSync(pkgInput) ||
      (isAbsolute && !pkgInput.startsWith(pkgPath))
    ) {
      return []
    }

    const {
      name,
      engines: { node } = {},
      dependencies = {},
      peerDependencies = {},
    } = require(path.resolve(pkgPath, 'package.json'))

    const external = externals.concat(
      Object.keys(peerDependencies),
      node ? Object.keys(dependencies).concat(builtins) : [],
    )

    const isTsInput = /\.tsx?/.test(pkgInput)
    const pkgFormats =
      formats && formats.length
        ? formats
        : DEFAULT_FORMATS.concat(node ? [] : 'umd')
    const pkgGlobals = external.reduce((pkgGlobals, pkg) => {
      if (pkgGlobals[pkg] == null) {
        pkgGlobals[pkg] = upperCamelCase(normalizePkg(pkg))
      }
      return pkgGlobals
    }, globals)

    return pkgFormats.map(format => {
      const isEsVersion = /^es(\d+|next)$/.test(format) && format !== 'es5'
      return {
        input: pkgInput,
        output: {
          file: path.resolve(
            pkgPath,
            `${pkgOutputDir}${format}${prod ? '.min' : ''}.js`,
          ),
          format: isEsVersion ? 'esm' : format,
          name: pkgGlobals[name] || upperCamelCase(normalizePkg(name)),
          globals,
          exports,
        },
        external: id =>
          external.some(pkg => id === pkg || id.startsWith(pkg + '/')),
        plugins: [
          alias({
            resolve: EXTENSIONS.concat(ASSETS_EXTENSIONS),
            entries: Array.isArray(aliases)
              ? aliases
              : Object.entries(aliases).reduce(
                  (entries, [find, replacement]) => {
                    if (
                      ['', 'null', 'undefined'].includes(find.trim()) &&
                      replacement != null
                    ) {
                      entries.push({
                        find,
                        replacement,
                      })
                    }
                    return entries
                  },
                  [],
                ),
          }),
          isTsAvailable && isTsInput
            ? typescript({
                target: isEsVersion ? format : 'es5',
              })
            : babel({
                exclude: ['*.min.js', '*.production.js'],
                presets: [
                  [
                    '@babel/preset-env',
                    isEsVersion
                      ? {
                          targets: {
                            esmodules: true,
                          },
                        }
                      : undefined,
                  ],
                ],
              }),
        ].concat(
          BASIC_PLUGINS,
          postcss(postcssOpts),
          prod
            ? [
                replace({
                  'process.env.NODE_ENV': JSON.stringify(PRODUCTION),
                }),
                terser(),
              ]
            : [],
        ),
      }
    })
  })

  console.assert(
    configs.length,
    "No configuration resolved, mark sure you've setup correctly",
  )

  return configs
}

export default (options = {}) => {
  const configs = configBase(options).concat(
    options.prod
      ? configBase(
          Object.assign({}, options, {
            prod: false,
          }),
        )
      : [],
  )

  info('configs: %O', configs)

  return configs
}
