#!/usr/bin/env node
const program = require('commander')
const { pick } = require('lodash')
const { rollup } = require('rollup')

const config = require('./lib/cjs')
const { version } = require('./package.json')

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
    JSON.stringify,
  )
  .option(
    '-p, --prod [boolean]',
    'whether to enable production(.min.js) bundle together at the same time',
  )
  .parse(process.argv)

config(
  pick(
    program,
    'input',
    'outputDir',
    'formats',
    'monorepo',
    'exports',
    'externals',
    'globals',
    'prod',
  ),
).map(options => rollup(options).then(bundle => bundle.write(options)))
