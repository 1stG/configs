import { defineConfig as defineOxlint } from '@1stg/oxlint-config'

describe('@1stg/oxlint-config', () => {
  it('enables framework plugins on demand', () => {
    expect(defineOxlint({ react: false }).plugins).not.toContain('react')
    expect(defineOxlint({ react: true }).plugins).toContain('react')
    expect(defineOxlint().categories).toEqual({ correctness: 'error' })
    expect(defineOxlint({ typeAware: true }).options?.typeAware).toBe(true)
    expect(defineOxlint({ typeAware: true }).rules).toHaveProperty(
      'typescript/no-floating-promises',
    )
    expect(
      defineOxlint({ ignorePatterns: ['**/generated/**'] }).ignorePatterns,
    ).toContain('**/generated/**')
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
