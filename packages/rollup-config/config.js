import fs from 'fs'
import path from 'path'
import Module from 'module'

import builtins from 'builtin-modules'
import { flatMap } from 'lodash'
import { terser } from 'rollup-plugin-terser'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import json from 'rollup-plugin-json'
import nodeResolve from 'rollup-plugin-node-resolve'
import typescript from 'rollup-plugin-typescript'
import { getGlobals, normalizePkg, upperCamelCase } from 'umd-globals'

const { NODE_ENV } = process.env

const isProd = NODE_ENV === 'production'

const plugins = [
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
  commonjs(),
  json(),
]

if (isProd) {
  plugins.push(terser())
}

const DEFAULT_FORMATS = ['cjs', 'es2015', 'esm']

let isTsAvailable = false

try {
  require.resolve('typescript')
  isTsAvailable = true
} catch (e) {}

const EXTENSIONS = Object.keys(Module._extensions)

if (isTsAvailable) {
  EXTENSIONS.unshift('.ts', '.tsx')
}

const tryExtensions = filepath => {
  const ext = EXTENSIONS.find(ext => fs.existsSync(filepath + ext))
  return ext ? filepath + ext : filepath
}

export default ({
  formats,
  monorepo,
  input,
  outDir = 'lib',
  exports,
  externals = [],
  umdGlobals,
} = {}) => {
  const pkgsPath = path.resolve('packages')
  const srcPath = path.resolve('src')

  if (typeof monorepo !== 'boolean') {
    monorepo = fs.existsSync(pkgsPath)
  }

  if (!monorepo && !fs.existsSync(srcPath) && input == null) {
    input = 'index'
    outDir = ''
  }

  input = tryExtensions(input || 'src/index')

  if (outDir && !outDir.endsWith('/')) {
    outDir = outDir + '/'
  }

  const pkgs = monorepo ? fs.readdirSync(pkgsPath) : ['']
  const isAbsolute = path.isAbsolute(input)

  const globals = getGlobals(umdGlobals)

  const configs = flatMap(pkgs, pkg => {
    const pkgPath = path.resolve(monorepo ? pkgsPath : '', pkg)
    const pkgInput = tryExtensions(path.resolve(pkgPath, input))

    if (
      !fs.existsSync(pkgInput) ||
      (isAbsolute && !input.startsWith(pkgPath))
    ) {
      return []
    }

    const {
      name,
      engines: { node } = {},
      dependencies = {},
      peerDependencies = {},
    } = require(path.resolve(pkgPath, 'package.json'))

    pkg = pkg || name

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
            `${outDir}${format}${isProd ? '.min' : ''}.js`,
          ),
          format: isEsVersion ? 'esm' : format,
          name: pkgGlobals[pkg] || upperCamelCase(normalizePkg(pkg)),
          globals,
          exports,
        },
        external,
        plugins: [
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
        ].concat(plugins),
      }
    })
  })

  console.assert(
    configs.length,
    "No configuration resolved, mark sure you've setup correctly",
  )

  return configs
}
