const mockState = vi.hoisted(() => ({
  availablePackages: new Set<string>(),
  tsconfig: undefined as string | undefined,
  packageTsconfig: undefined as string | undefined,
}))

vi.mock('@pkgr/utils', async importOriginal => {
  const actual = await importOriginal<typeof import('@pkgr/utils')>()
  return {
    ...actual,
    isPkgAvailable: (name: string) => mockState.availablePackages.has(name),
    tryFile: (filename: string) => (filename === mockState.tsconfig ? filename : undefined),
    tryPkg: () => mockState.packageTsconfig,
  }
})

import { join } from 'node:path'

import { defineConfig as defineStaged } from '@1stg/nano-staged'

afterEach(() => {
  mockState.availablePackages.clear()
  mockState.tsconfig = undefined
  mockState.packageTsconfig = undefined
})

describe('@1stg/nano-staged', () => {
  it('builds both formatter tasks', () => {
    mockState.tsconfig = join(process.cwd(), 'tsconfig.json')
    const config = defineStaged({
      formatter: 'both',
      linter: 'oxlint',
      stylelint: true,
      tsconfig: 'tsconfig.json',
      typecheck: 'tsc',
    })
    expect(config['*.{cjs,cts,js,jsx,mjs,mts,ts,tsx,vue}']).toEqual(['oxlint --fix', 'oxfmt'])
    expect(config['*.{ini,properties,pug,rb,sass,sh,styl,stylus}']).toBe('prettier --write')
    expect(config['**/!(*package).json']).toEqual(['oxfmt'])
    expect(config['**/package.*.json']).toEqual(['oxfmt'])
    expect(config['**/package.json']).toEqual(['prettier --write'])
    expect(config.Dockerfile).toBe('prettier --write')
    expect(config['*.{cts,mts,ts,tsx}']).toBeTypeOf('function')
  })

  it('keeps linter/stylelint tasks when formatting is disabled', () => {
    const config = defineStaged({
      formatter: false,
      linter: 'eslint',
      stylelint: true,
      tsconfig: 'tsconfig.json',
    })
    expect(config['*.{cjs,cts,js,jsx,mjs,mts,ts,tsx,vue}']).toEqual(['eslint --fix'])
    expect(config['*.{css,less,scss}']).toEqual(['stylelint --allow-empty-input --cache --fix'])
    expect(config['*.{gql,graphql,html,jsonc,json5,md,mdx,toml,yaml,yml}']).toEqual([
      'eslint --fix',
    ])
    expect(config['**/*.json']).toEqual(['eslint --fix'])
    expect(config['*.{cts,mts,ts,tsx}']).toBeUndefined()
  })
})

it('runs both linters', () => {
  const config = defineStaged({
    formatter: false,
    linter: 'both',
    stylelint: false,
    tsconfig: 'tsconfig.json',
    typecheck: false,
  })
  expect(config['*.{cjs,cts,js,jsx,mjs,mts,ts,tsx,vue}']).toEqual(['oxlint --fix', 'eslint --fix'])
  expect(config['*.{gql,graphql,html,jsonc,json5,md,mdx,toml,yaml,yml}']).toEqual(['eslint --fix'])
})

it('auto-detects both linters', () => {
  mockState.availablePackages.add('oxlint')
  mockState.availablePackages.add('eslint')

  const config = defineStaged({
    formatter: false,
    stylelint: false,
    tsconfig: 'tsconfig.json',
    typecheck: false,
  })
  expect(config['*.{cjs,cts,js,jsx,mjs,mts,ts,tsx,vue}']).toEqual(['oxlint --fix', 'eslint --fix'])
  expect(config['*.{gql,graphql,html,jsonc,json5,md,mdx,toml,yaml,yml}']).toEqual(['eslint --fix'])
})

it('auto-detects an oxlint-only setup', () => {
  mockState.availablePackages.add('oxlint')

  const config = defineStaged({
    formatter: false,
    stylelint: false,
    tsconfig: 'tsconfig.json',
    typecheck: false,
  })
  expect(config['*.{cjs,cts,js,jsx,mjs,mts,ts,tsx,vue}']).toEqual(['oxlint --fix'])
  expect(config['*.{gql,graphql,html,jsonc,json5,md,mdx,toml,yaml,yml}']).toBeUndefined()
})

it('auto-detects an eslint-only setup', () => {
  mockState.availablePackages.add('eslint')

  const config = defineStaged({
    formatter: false,
    stylelint: false,
    tsconfig: 'tsconfig.json',
    typecheck: false,
  })
  expect(config['*.{cjs,cts,js,jsx,mjs,mts,ts,tsx,vue}']).toEqual(['eslint --fix'])
  expect(config['*.{gql,graphql,html,jsonc,json5,md,mdx,toml,yaml,yml}']).toEqual(['eslint --fix'])
})

it('auto-detects the formatter', () => {
  mockState.availablePackages.add('oxfmt')

  const withOxfmt = defineStaged({
    linter: false,
    stylelint: false,
    tsconfig: 'tsconfig.json',
    typecheck: false,
  })
  expect(withOxfmt['*.{cjs,cts,js,jsx,mjs,mts,ts,tsx,vue}']).toEqual(['oxfmt'])

  mockState.availablePackages.clear()
  const withPrettier = defineStaged({
    linter: false,
    stylelint: false,
    tsconfig: 'tsconfig.json',
    typecheck: false,
  })
  expect(withPrettier['*.{cjs,cts,js,jsx,mjs,mts,ts,tsx,vue}']).toEqual(['prettier --write'])
})

it('supports vue-tsc type checking', () => {
  mockState.tsconfig = join(process.cwd(), 'tsconfig.json')
  const config = defineStaged({
    formatter: false,
    linter: false,
    stylelint: false,
    tsconfig: 'tsconfig.json',
    typecheck: 'vue-tsc',
  })
  expect(config['*.{cts,mts,ts,tsx,vue}']).toBeTypeOf('function')
})

it('auto-detects typecheck from installed tools', () => {
  mockState.tsconfig = join(process.cwd(), 'tsconfig.json')
  mockState.availablePackages.add('typescript')

  const tsc = defineStaged({
    formatter: false,
    linter: false,
    stylelint: false,
    tsconfig: 'tsconfig.json',
  })
  expect(tsc['*.{cts,mts,ts,tsx}']).toBeTypeOf('function')

  mockState.availablePackages.clear()
  mockState.availablePackages.add('vue-tsc')
  const vueTsc = defineStaged({
    formatter: false,
    linter: false,
    stylelint: false,
  })
  expect(vueTsc['*.{cts,mts,ts,tsx,vue}']).toBeTypeOf('function')

  mockState.tsconfig = undefined
  mockState.availablePackages.clear()
  mockState.availablePackages.add('typescript')
  mockState.packageTsconfig = join(process.cwd(), 'node_modules/@1stg/tsconfig/tsconfig.json')
  const disabled = defineStaged({
    formatter: false,
    linter: false,
    stylelint: false,
  })
  expect(disabled['*.{cts,mts,ts,tsx}']).toBeUndefined()
})

it('uses the package fallback for explicit typecheck', () => {
  mockState.availablePackages.add('typescript')
  mockState.packageTsconfig = join(process.cwd(), 'node_modules/@1stg/tsconfig/tsconfig.json')

  const config = defineStaged({
    formatter: false,
    linter: false,
    stylelint: false,
    typecheck: 'tsc',
  })
  expect(config['*.{cts,mts,ts,tsx}']).toBeTypeOf('function')
  expect((config['*.{cts,mts,ts,tsx}'] as () => string[])()[0]).toBe(
    'tsc -p node_modules/@1stg/tsconfig/tsconfig.json --noEmit',
  )
})

it('disables auto typecheck when an explicit tsconfig is missing', () => {
  mockState.availablePackages.add('typescript')
  mockState.tsconfig = join(process.cwd(), 'tsconfig.json')

  const config = defineStaged({
    tsconfig: 'missing-tsconfig.json',
    formatter: false,
    linter: false,
    stylelint: false,
  })
  expect(config['*.{cts,mts,ts,tsx}']).toBeUndefined()
})

it('disables auto typecheck without a project tsconfig', () => {
  mockState.availablePackages.add('typescript')

  const config = defineStaged({
    formatter: false,
    linter: false,
    stylelint: false,
  })
  expect(config['*.{cts,mts,ts,tsx}']).toBeUndefined()
})

it('throws without a discoverable tsconfig', () => {
  expect(() => defineStaged({ typecheck: 'tsc' })).toThrow('@1stg/nano-staged: no tsconfig found')
})
