import { defineConfig as defineOxlint } from '@1stg/oxlint-config'

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
