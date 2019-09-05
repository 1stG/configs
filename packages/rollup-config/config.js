import fs from 'fs'
import path from 'path'

import { camelCase, flatMap, upperFirst } from 'lodash'
import { terser } from 'rollup-plugin-terser'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'
import typescript from 'rollup-plugin-typescript'
import { getGlobals } from 'umd-globals'

const { NODE_ENV } = process.env

const isProd = NODE_ENV === 'production'

const plugins = [
  nodeResolve({
    mainFields: [
      'esnext',
      'es2015',
      'esm2015',
      'fesm2015',
      'fesm5',
      'module',
      'main',
    ],
  }),
  commonjs(),
]

if (isProd) {
  plugins.push(terser())
}

const DEFAULT_FORMATS = ['cjs', 'esm', 'umd']

let isTsProject = false

try {
  require.resolve('typescript')
  DEFAULT_FORMATS.push('es2015')
  isTsProject = true
} catch (e) {}

const DEFAULT_EXT = isTsProject ? 'ts' : 'js'

const DEFAULT_INPUT = 'src/index' + DEFAULT_EXT

export default ({
  formats = DEFAULT_FORMATS,
  monorepo,
  input = DEFAULT_INPUT,
  outDir = 'lib',
  exports,
  umdGlobals,
} = {}) => {
  const pkgsPath = path.resolve('packages')
  const srcPath = path.resolve('src')

  if (typeof monorepo !== 'boolean') {
    monorepo = fs.existsSync(pkgsPath)
  }

  if (!monorepo && !fs.existsSync(srcPath) && input === DEFAULT_INPUT) {
    input = 'index.' + DEFAULT_EXT
    outDir = ''
  }

  if (outDir && !outDir.endsWith('/')) {
    outDir = outDir + '/'
  }

  const pkgs = monorepo ? fs.readdirSync(pkgsPath) : ['']
  const isAbsolute = path.isAbsolute(input)

  const globals = getGlobals(umdGlobals)

  const configs = flatMap(pkgs, pkg => {
    const pkgPath = path.resolve(monorepo ? pkgsPath : '', pkg)
    const pkgInput = path.resolve(pkgPath, input)

    if (
      !fs.existsSync(pkgInput) ||
      (isAbsolute && !input.startsWith(pkgPath))
    ) {
      return []
    }

    const { name, peerDependencies: externals } = require(path.resolve(
      pkgPath,
      'package.json',
    ))

    pkg = pkg || name

    const external = Object.keys(externals)
    return formats.map(format => {
      const isEsVersion = /^es(\d+|next)$/.test(format)
      return {
        input: pkgInput,
        output: {
          file: path.resolve(
            pkgPath,
            `${outDir}${format}${isProd ? '.min' : ''}.js`,
          ),
          format: isEsVersion ? 'esm' : format,
          name: globals[pkg] || upperFirst(camelCase(pkg)),
          globals,
          exports,
        },
        external,
        plugins: [
          typescript(
            isTsProject
              ? {
                  target: isEsVersion ? format : 'es5',
                }
              : babel(
                  isEsVersion
                    ? {
                        targets: {
                          esmodules: true,
                        },
                      }
                    : {},
                ),
          ),
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
