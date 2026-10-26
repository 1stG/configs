export const iniRcFiles: string[] = ['**/.npmrc']

export const shRcFiles: string[] = ['**/.*shrc', '**/.env.*']

export const nonJsonRcFiles: string[] = [
  ...iniRcFiles,
  ...shRcFiles,
  '**/.browserslistrc',
  '**/.nvmrc',
]

export const jsoncFiles: string[] = [
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

/** Whether the environment variable is enabled explicitly. */
export const isEnvEnabled = (env: string): boolean =>
  TRUTHY_ENV_VALUES.has(process.env[env] as string)

const FALSY_ENV_VALUES = new Set(['', '0', 'false', 'f', 'no', 'n'])

/** Whether the environment variable is disabled explicitly. */
export const isEnvDisabled = (env: string): boolean =>
  FALSY_ENV_VALUES.has(process.env[env] as string)

export const preferPrettier = isEnvEnabled('CONFIG_PREFER_PRETTIER')

export const isCI = isEnvEnabled('CI')
