exports.iniRcFiles = ['.npmrc', '.yarnrc']

exports.shRcFiles = ['.*shrc']

exports.nonJsonRcFiles = [
  ...exports.iniRcFiles,
  ...exports.shRcFiles,
  '.browserslistrc',
  '.nvmrc',
]

exports.jsoncFiles = [
  '*.code-workspace',
  'angular.json',
  'jsconfig.json',
  'ng-package.json',
  'ng-package.*.json',
  'nx.json',
  'project.json',
  'tsconfig.json',
  'tsconfig.*.json',
  '.vscode/*.json',
]

exports.preferPrettier = !['0', 'false', undefined].includes(
  process.env.CONFIG_PREFER_PRETTIER,
)
