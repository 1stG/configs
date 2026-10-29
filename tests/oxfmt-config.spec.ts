import { defineConfig as defineOxfmt } from '@1stg/oxfmt-config'
import { format } from 'oxfmt'

const WIDE_PRINT_WIDTH = 120

describe('@1stg/oxfmt-config', () => {
  it('keeps Prettier-compatible defaults', () => {
    const config = defineOxfmt()
    expect(config.semi).toBe(false)
    expect(config.sortImports).toBe(true)
    expect(config.sortPackageJson).toBe(false)
    expect(config.jsdoc).toEqual({ keepUnparsableExampleIndent: true })
    expect(config.overrides).toEqual([
      {
        files: ['.changeset/*.md'],
        options: { singleQuote: false },
      },
    ])
  })

  it('preserves unparsable example indentation', async () => {
    const source = `/**
 * @example
 * \`\`\`sh
 * if true; then
 *   echo hi
 * fi
 * \`\`\`
 */
const x = 1
`

    const { code } = await format('test.ts', source, defineOxfmt())
    expect(code).toContain(' *   ```sh\n *   if true; then\n *     echo hi\n *   fi\n *   ```')
  })

  it('accepts overrides', () => {
    expect(defineOxfmt({ printWidth: WIDE_PRINT_WIDTH }).printWidth).toBe(WIDE_PRINT_WIDTH)
    expect(defineOxfmt({ ignorePatterns: ['package.json'] }).ignorePatterns).toEqual([
      'package.json',
    ])
    const userOverride = { files: ['*.js'], options: { semi: true } }
    expect(defineOxfmt({ overrides: [userOverride] }).overrides).toEqual([
      {
        files: ['.changeset/*.md'],
        options: { singleQuote: false },
      },
      userOverride,
    ])
  })
})
