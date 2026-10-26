import { defineConfig as defineStylelint } from '@1stg/stylelint-config'

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
