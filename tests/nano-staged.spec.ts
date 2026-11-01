const mockState = vi.hoisted(() => ({
  availablePackages: new Set<string>(),
  tsconfig: undefined as string | undefined,
}))

vi.mock('@pkgr/utils', async importOriginal => {
  const actual = await importOriginal<typeof import('@pkgr/utils')>()
  return {
    ...actual,
    isPkgAvailable: (name: string) => mockState.availablePackages.has(name),
    tryFile: () => mockState.tsconfig,
    tryPkg: () => undefined,
  }
})

import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { defineConfig as defineStaged } from '@1stg/nano-staged'

afterEach(() => {
  mockState.availablePackages.clear()
  mockState.tsconfig = undefined
})

describe('@1stg/nano-staged', () => {
  it('builds both formatter tasks', () => {
    const config = defineStaged({
      cwd: process.cwd(),
      formatter: 'both',
      linter: 'oxlint',
      stylelint: true,
      tsconfig: 'tsconfig.json',
      typecheck: 'tsc',
    })
    expect(config['*.{cjs,cts,js,jsx,mjs,mts,ts,tsx,vue}']).toEqual(['oxlint --fix', 'oxfmt'])
    expect(config['*.{ini,properties,pug,rb,sass,sh,styl,stylus}']).toBe('prettier --write')
    expect(config['**/!(*package).json']).toEqual(['oxfmt'])
    expect(config['**/package.json']).toEqual(['prettier --write'])
    expect(config.Dockerfile).toBe('prettier --write')
    expect(config['*.{cts,mts,ts,tsx}']).toBeTypeOf('function')
  })

  it('keeps linter/stylelint tasks when formatting is disabled', () => {
    const config = defineStaged({
      cwd: process.cwd(),
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

it('supports vue-tsc type checking', () => {
  const config = defineStaged({
    cwd: process.cwd(),
    formatter: false,
    linter: false,
    stylelint: false,
    tsconfig: 'tsconfig.json',
    typecheck: 'vue-tsc',
  })
  expect(config['*.{cts,mts,ts,tsx,vue}']).toBeTypeOf('function')
})

it('auto-detects typecheck from installed tools', () => {
  mockState.availablePackages.add('typescript')

  const tsc = defineStaged({
    cwd: process.cwd(),
    formatter: false,
    linter: false,
    stylelint: false,
    tsconfig: 'tsconfig.json',
  })
  expect(tsc['*.{cts,mts,ts,tsx}']).toBeTypeOf('function')

  mockState.tsconfig = join(process.cwd(), 'tsconfig.json')
  mockState.availablePackages.clear()
  mockState.availablePackages.add('vue-tsc')
  const vueTsc = defineStaged({
    cwd: process.cwd(),
    formatter: false,
    linter: false,
    stylelint: false,
  })
  expect(vueTsc['*.{cts,mts,ts,tsx,vue}']).toBeTypeOf('function')

  mockState.availablePackages.clear()
  const disabled = defineStaged({
    cwd: process.cwd(),
    formatter: false,
    linter: false,
    stylelint: false,
  })
  expect(disabled['*.{cts,mts,ts,tsx}']).toBeUndefined()
})

it('disables auto typecheck without a project tsconfig', () => {
  mockState.availablePackages.add('typescript')

  const config = defineStaged({
    cwd: process.cwd(),
    formatter: false,
    linter: false,
    stylelint: false,
  })
  expect(config['*.{cts,mts,ts,tsx}']).toBeUndefined()
})

it('throws without a discoverable tsconfig', () => {
  const cwd = mkdtempSync(join(tmpdir(), 'nano-staged-'))
  try {
    expect(() => defineStaged({ cwd, typecheck: 'tsc' })).toThrow(
      '@1stg/nano-staged: no tsconfig found',
    )
  } finally {
    rmSync(cwd, { force: true, recursive: true })
  }
})
