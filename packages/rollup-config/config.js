import fs from 'fs'
import path from 'path'

import { camelCase, flatMap, startCase } from 'lodash'
import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript'
import { globals } from 'umd-globals'

const { NODE_ENV } = process.env

const isProd = NODE_ENV === 'production'

const plugins = [typescript()]

if (isProd) {
  plugins.push(terser())
}

const DEFAULT_FORMATS = ['cjs', 'esm', 'umd']
const DEFAULT_INPUT = 'src/index.ts'

export default ({
  formats = DEFAULT_FORMATS,
  monorepo,
  input = DEFAULT_INPUT,
  outDir = 'lib',
} = {}) => {
  const pkgsPath = path.resolve('packages')
  const srcPath = path.resolve('src')

  if (typeof monorepo !== 'boolean') {
    monorepo = fs.existsSync(pkgsPath)
  }

  if (!monorepo && !fs.existsSync(srcPath) && input === DEFAULT_INPUT) {
    input = 'index.ts'
  }

  if (outDir && !outDir.endsWith('/')) {
    outDir = outDir + '/'
  }

  const pkgs = monorepo ? fs.readdirSync(pkgsPath) : ['']
  const isAbsolute = path.isAbsolute(input)

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
    return formats.map(format => ({
      input: pkgInput,
      output: {
        file: path.resolve(
          pkgPath,
          `${outDir}${format}${isProd ? '.min' : ''}.js`,
        ),
        format,
        name: globals[pkg] || startCase(camelCase(pkg)),
        globals,
      },
      external,
      plugins,
    }))
  })

  console.assert(
    configs.length,
    "No configuration resolved, mark sure you've setup correctly",
  )

  return configs
}
