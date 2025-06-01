// @ts-check

export const iniRcFiles = ['**/.npmrc']

export const shRcFiles = ['**/.*shrc', '**/.env.*']

export const nonJsonRcFiles = [
  ...iniRcFiles,
  ...shRcFiles,
  '**/.browserslistrc',
  '**/.nvmrc',
]

export const jsoncFiles = [
  '**/*.code-workspace',
  '**/angular.json',
  '**/jsconfig.json',
  '**/ng-package.json',
  '**/ng-package.*.json',
  '**/nx.json',
  '**/project.json',
  '**/tsconfig.json',
  '**/tsconfig.*.json',
  '**/.vscode/*.json',
]

const TRUTHY_ENV_VALUES = new Set(['1', 'true', 't', 'yes', 'y'])

/**
 * @param {string} env
 * @returns {boolean} Whether the environment variable is enabled explicitly
 */
export const isEnvEnabled = env =>
  TRUTHY_ENV_VALUES.has(/** @type {string} */ (process.env[env]))

const FALSY_ENV_VALUES = new Set(['', '0', 'false', 'f', 'no', 'n'])

/**
 * @param {string} env
 * @returns {boolean} Whether the environment variable is disabled explicitly
 */
export const isEnvDisabled = env =>
  FALSY_ENV_VALUES.has(/** @type {string} */ (process.env[env]))

export const preferPrettier = isEnvEnabled('CONFIG_PREFER_PRETTIER')

export const isCI = isEnvEnabled('CI')
