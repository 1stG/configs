#!/usr/bin/env node
const program = require('commander')
const debug = require('debug')
const { pick } = require('lodash')
const { rollup } = require('rollup')

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
    '-g, --globals <json>',
    'JSON string to be parsed as umd globals map',
    JSON.parse,
  )
  .option(
    '-p, --prod [boolean]',
    'whether to enable production(.min.js) bundle together at the same time',
  )
  .parse(process.argv)

const options = pick(
  program,
  'input',
  'outputDir',
  'formats',
  'monorepo',
  'exports',
  'externals',
  'globals',
  'prod',
)

info('options: %O', options)

config(options).map(opts =>
  rollup(opts)
    .then(bundle => bundle.write(opts))
    .catch(e => {
      console.error(e)
      process.exitCode = 1
    }),
)
