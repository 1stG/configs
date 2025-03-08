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

export const preferPrettier = !['0', 'false', undefined].includes(
  process.env.CONFIG_PREFER_PRETTIER,
)
