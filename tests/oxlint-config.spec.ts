import { defineConfig as defineOxlint } from '@1stg/oxlint-config'

type NoMagicRule = [
  string,
  {
    enforceConst?: boolean
    ignore: number[]
    ignoreDefaultValues?: boolean
    ignoreEnums?: boolean
  },
]

const CUSTOM_MAGIC_NUMBER = 16
const OTHER_MAGIC_NUMBER = 64

const getNoMagic = (config: ReturnType<typeof defineOxlint>) =>
  config.rules?.['no-magic-numbers'] as NoMagicRule

describe('@1stg/oxlint-config', () => {
  it('merges no-magic-numbers options', () => {
    const defaults = getNoMagic(defineOxlint())
    expect(defaults[1]).toMatchObject({
      enforceConst: true,
      ignoreArrayIndexes: true,
      ignoreClassFieldInitialValues: true,
      ignoreDefaultValues: true,
      ignoreEnums: true,
      ignoreNumericLiteralTypes: true,
      ignoreReadonlyClassProperties: true,
      ignoreTypeIndexes: true,
    })
    expect(defaults[1].ignore).toEqual(expect.arrayContaining([-1, 0, 1]))

    const custom = getNoMagic(
      defineOxlint({
        noMagicNumbers: {
          ignore: [CUSTOM_MAGIC_NUMBER, OTHER_MAGIC_NUMBER],
          ignoreEnums: true,
          enforceConst: false,
        },
      }),
    )
    expect(custom[1].ignore).toEqual(
      expect.arrayContaining([-1, CUSTOM_MAGIC_NUMBER, OTHER_MAGIC_NUMBER]),
    )
    expect(custom[1]).toMatchObject({ enforceConst: false, ignoreEnums: true })

    expect(defineOxlint({ noMagicNumbers: false }).rules?.['no-magic-numbers']).toBe('off')

    const raw = getNoMagic(
      defineOxlint({
        rules: { 'no-magic-numbers': ['warn', { ignore: [CUSTOM_MAGIC_NUMBER] }] },
      }),
    )
    expect(raw).toEqual(['warn', { ignore: [CUSTOM_MAGIC_NUMBER] }])
  })

  it('enables framework plugins on demand', () => {
    expect(defineOxlint({ react: false }).plugins).not.toContain('react')
    expect(defineOxlint({ react: true }).plugins).toContain('react')
    expect(defineOxlint({ react: true }).plugins).toContain('react-perf')
    expect(defineOxlint().categories).toEqual({
      correctness: 'error',
      perf: 'warn',
    })
    expect(defineOxlint({ typeAware: false }).options?.typeAware).toBeFalsy()
    expect(defineOxlint({ typeAware: true }).options?.typeAware).toBe(true)
    expect(defineOxlint({ typeAware: true }).rules).toHaveProperty(
      'typescript/no-floating-promises',
    )
    expect(defineOxlint({ ignorePatterns: ['**/generated/**'] }).ignorePatterns).toContain(
      '**/generated/**',
    )
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
