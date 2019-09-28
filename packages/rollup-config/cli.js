#!/usr/bin/env node
const program = require('commander')
const debug = require('debug')
const JSOX = require('jsox')
const { pick } = require('lodash')
const { rollup, watch } = require('rollup')

const config = require('./lib/cjs')
const { version } = require('./package.json')

const info = debug('r:info')

const parseArrayArgs = (curr, prev) => {
  curr = curr.split(',')
  return prev ? prev.concat(curr) : curr
}

program
  .version(version)
  .option('-i, --input <filename>', 'input entry file path')
  .option('--exclude <path>', 'exclude package(s) for monorepo', parseArrayArgs)
  .option('-o, --output-dir [output]', 'output destination directory')
  .option(
    '-f, --formats <format>',
    'Type of output (amd, cjs, esm, iife, umd, and es versions like es2015)',
    parseArrayArgs,
  )
  .option(
    '-m, --monorepo <false | path>',
    'whether consider the project as a monorepo, or custom the packages path',
  )
  .option(
    '-e, --exports <mode>',
    'Specify export mode (auto, default, named, none)',
  )
  .option(
    '-x, --externals <package>',
    'extra external packages, peerDependencies, and dependencies for node by default',
    parseArrayArgs,
  )
  .option(
    '-g, --globals <JSOX>',
    'JSON string to be parsed as umd globals map',
    JSOX.parse,
  )
  .option(
    '-a, --aliases <JSOX>',
    'entries setting for rollup-plugin-alias, could be array or object',
    JSOX.parse,
  )
  .option(
    '-s, --source-map <boolean>',
    'whether or not to enable sourceMap generation for CommonJS modules, which may cause performance issue',
    false,
  )
  .option(
    '-w, --watch [boolean]',
    'whether to enable watch mode for development',
  )
  .option('--postcss [JSOX]', 'options for rollup-plugin-postcss', JSOX.parse)
  .option(
    '-p, --prod [boolean]',
    'whether to enable production(.min.js) bundle together at the same time',
  )
  .parse(process.argv)

const options = pick(
  program,
  'input',
  'exclude',
  'outputDir',
  'formats',
  'monorepo',
  'exports',
  'externals',
  'globals',
  'aliases',
  'sourceMap',
  'postcss',
  'prod',
)

info('options: %O', options)

const startWatcher = configs => {
  const watcher = watch(configs)
  watcher.on('event', event => {
    switch (event.code) {
      case 'START':
        info('🚀 (re)starting...')
        break
      case 'END':
        info('🎉 bundled successfully.')
        break
      case 'ERROR':
        console.error(event)
        break
      case 'FATAL':
        console.error(event)
        watcher.close()
        break
    }
  })
}

const configs = config(options)

if (program.watch) {
  startWatcher(configs)
  return
}

configs.map(opts =>
  rollup(opts)
    .then(bundle => bundle.write(opts))
    .catch(e => {
      console.error(e)
      // eslint-disable-next-line no-process-exit
      process.exit(1)
    }),
)
