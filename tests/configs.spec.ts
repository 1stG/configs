import { defineConfig as defineCommitlint } from '@1stg/commitlint-config'
import { defineConfig as defineMarkuplint } from '@1stg/markuplint-config'
import { defineConfig as defineStaged } from '@1stg/nano-staged'
import { defineConfig as defineOxfmt } from '@1stg/oxfmt-config'
import { defineConfig as defineOxlint } from '@1stg/oxlint-config'
import { defineConfig as definePostcss } from '@1stg/postcss-config'
import prettierConfig, {
  defineConfig as definePrettier,
} from '@1stg/prettier-config'
import { defineConfig as defineHooks } from '@1stg/simple-git-hooks'
import { defineConfig as defineStylelint } from '@1stg/stylelint-config'
import postcss from 'postcss'

describe('@1stg/postcss-config', () => {
  const run = async (options: object) => {
    const { plugins } = definePostcss(options)
    const result = await postcss(plugins).process('a { color: red; /* x */ }', {
      from: undefined,
    })
    return result.css
  }

  it('minifies only in production', async () => {
    expect(await run({ env: 'development' })).toContain('/* x */')
    expect(await run({ env: 'production' })).toBe('a{color:red}')
  })

  it('lets options override the environment', async () => {
    expect(await run({ cssnano: false, env: 'production' })).toContain(
      '/* x */',
    )
    expect(await run({ env: 'development', minify: true })).not.toContain(
      '/* x */',
    )
  })

  it('maps in development only', () => {
    expect(definePostcss({ env: 'development' }).map).toBe(true)
    expect(definePostcss({ env: 'production' }).map).toBe(false)
  })
})

describe('@1stg/stylelint-config', () => {
  it('builds the base config', () => {
    const config = defineStylelint()
    expect(config.extends).toContain('stylelint-config-standard')
    expect(config.extends).not.toContain('stylelint-prettier/recommended')
  })

  it('adds scss, modules and prettier on demand', () => {
    const config = defineStylelint({
      modules: true,
      prettier: true,
      scss: true,
    })
    expect(config.extends).toContain('stylelint-prettier/recommended')
    expect(config.rules?.['selector-pseudo-class-no-unknown']).toBeDefined()
    expect(
      config.overrides?.some(
        override => override.customSyntax === 'postcss-scss',
      ),
    ).toBe(true)
  })
})

describe('@1stg/markuplint-config', () => {
  it('adds the Vue parser on demand', () => {
    expect(defineMarkuplint().parser?.['.vue$']).toBeUndefined()
    expect(defineMarkuplint({ vue: true }).parser?.['.vue$']).toBe(
      '@markuplint/vue-parser',
    )
  })
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
    expect(config['*.{cjs,cts,js,jsx,mjs,mts,ts,tsx,vue}']).toEqual([
      'oxlint --fix',
      'oxfmt',
    ])
    expect(config['*.{ini,properties,pug,rb,sass,sh,styl,stylus}']).toBe(
      'prettier --write',
    )
    expect(config['*.ts?(x)']).toBeTypeOf('function')
  })
})

describe('@1stg/commitlint-config', () => {
  it('adds workspace scopes for monorepos', () => {
    expect(defineCommitlint().rules).toBeDefined()
    expect(defineCommitlint({ monorepo: false }).rules).not.toEqual(
      defineCommitlint({ monorepo: true }).rules,
    )
  })
})

describe('@1stg/simple-git-hooks', () => {
  it('uses the configured runner', () => {
    expect(defineHooks({ runner: 'pnpm' })).toEqual({
      'commit-msg': 'pnpm commitlint -e',
      'pre-commit': 'pnpm nano-staged',
    })
  })
})

describe('@1stg/oxlint-config', () => {
  it('enables framework plugins on demand', () => {
    expect(defineOxlint().plugins).not.toContain('react')
    expect(defineOxlint({ react: true }).plugins).toContain('react')
    expect(defineOxlint().categories).toEqual({ correctness: 'error' })
    expect(
      defineOxlint({
        jsPlugins: ['eslint-plugin-sonarjs'],
        rules: { 'sonarjs/no-identical-functions': 'warn' },
      }),
    ).toMatchObject({
      jsPlugins: ['eslint-plugin-sonarjs'],
      rules: { 'sonarjs/no-identical-functions': 'warn' },
    })
  })
})

describe('@1stg/oxfmt-config', () => {
  it('keeps Prettier-compatible defaults', () => {
    const config = defineOxfmt()
    expect(config.printWidth).toBe(80)
    expect(config.semi).toBe(false)
    expect(config.sortImports).toBe(true)
    expect(config.sortPackageJson).toBe(false)
  })

  it('accepts overrides', () => {
    expect(defineOxfmt({ printWidth: 120 }).printWidth).toBe(120)
  })
})

describe('@1stg/prettier-config', () => {
  it('uses the shared defaults', () => {
    expect(prettierConfig).toMatchObject({
      arrowParens: 'avoid',
      semi: false,
      singleQuote: true,
      trailingComma: 'all',
    })
  })

  it('resolves plugin entry points without importing them', () => {
    expect(prettierConfig.plugins).toHaveLength(12)
    expect(
      prettierConfig.plugins?.every(
        plugin => typeof plugin === 'string' && plugin.startsWith('/'),
      ),
    ).toBe(true)
  })

  it('adds the Vue HTML parser', () => {
    expect(definePrettier({ framework: 'vue' }).overrides).toContainEqual({
      files: '*.html',
      options: { parser: 'vue' },
    })
  })
})
