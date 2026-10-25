import { createConfig as createCommitlintConfig } from '@1stg/commitlint-config'
import { createConfig as createMarkuplintConfig } from '@1stg/markuplint-config'
import { createStaged } from '@1stg/nano-staged'
import { createConfig as createOxfmtConfig } from '@1stg/oxfmt-config'
import { createConfig as createOxlintConfig } from '@1stg/oxlint-config'
import postcssConfig from '@1stg/postcss-config'
import { createHooks } from '@1stg/simple-git-hooks'
import { createConfig as createStylelintConfig } from '@1stg/stylelint-config'
import postcss from 'postcss'

describe('@1stg/postcss-config', () => {
  const run = async (options: object) => {
    const { plugins } = postcssConfig.createConfig(options)
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
    expect(postcssConfig.createConfig({ env: 'development' }).map).toBe(true)
    expect(postcssConfig.createConfig({ env: 'production' }).map).toBe(false)
  })
})

describe('@1stg/stylelint-config', () => {
  it('builds the base config', () => {
    const config = createStylelintConfig()
    expect(config.extends).toContain('stylelint-config-standard')
    expect(config.extends).not.toContain('stylelint-prettier/recommended')
  })

  it('adds scss, modules and prettier on demand', () => {
    const config = createStylelintConfig({
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
    expect(createMarkuplintConfig().parser?.['.vue$']).toBeUndefined()
    expect(createMarkuplintConfig({ vue: true }).parser?.['.vue$']).toBe(
      '@markuplint/vue-parser',
    )
  })
})

describe('@1stg/nano-staged', () => {
  it('builds both formatter tasks', () => {
    const config = createStaged({
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
    expect(createCommitlintConfig().rules).toBeDefined()
    expect(createCommitlintConfig({ monorepo: true }).rules).not.toEqual(
      createCommitlintConfig().rules,
    )
  })
})

describe('@1stg/simple-git-hooks', () => {
  it('uses the configured runner', () => {
    expect(createHooks({ runner: 'pnpm' })).toEqual({
      'commit-msg': 'pnpm commitlint -e',
      'pre-commit': 'pnpm nano-staged',
    })
  })
})

describe('@1stg/oxlint-config', () => {
  it('enables framework plugins on demand', () => {
    expect(createOxlintConfig().plugins).not.toContain('react')
    expect(createOxlintConfig({ react: true }).plugins).toContain('react')
    expect(createOxlintConfig().categories).toEqual({ correctness: 'error' })
  })
})

describe('@1stg/oxfmt-config', () => {
  it('keeps Prettier-compatible defaults', () => {
    const config = createOxfmtConfig()
    expect(config.printWidth).toBe(80)
    expect(config.semi).toBe(false)
    expect(config.sortImports).toBe(true)
  })

  it('accepts overrides', () => {
    expect(createOxfmtConfig({ printWidth: 120 }).printWidth).toBe(120)
  })
})
