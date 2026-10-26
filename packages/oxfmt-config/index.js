// @ts-check

/**
 * @typedef {object} OxfmtConfigOptions
 * @property {number} [printWidth=80] Line width.
 * @property {boolean} [semi=false] Print semicolons.
 * @property {boolean} [singleQuote=true] Use single quotes.
 * @property {boolean} [sortImports=true] Sort imports with Oxfmt's built-in sorter.
 * @property {boolean} [sortPackageJson=true] Sort `package.json` keys.
 * @property {boolean | object} [jsdoc=false] Format JSDoc comments.
 * @property {object[]} [overrides] File-specific overrides.
 */

/**
 * Build an Oxfmt configuration. `oxfmt --config oxfmt.config.js` picks it up.
 *
 * @param {OxfmtConfigOptions} [options]
 * @returns {Record<string, unknown>}
 */
export const defineConfig = ({
  printWidth = 80,
  semi = false,
  singleQuote = true,
  sortImports = true,
  sortPackageJson = true,
  jsdoc = false,
  overrides = [],
} = {}) => ({
  arrowParens: 'avoid',
  printWidth,
  semi,
  singleAttributePerLine: true,
  singleQuote,
  sortImports,
  sortPackageJson,
  trailingComma: 'all',
  ...(jsdoc && { jsdoc }),
  ...(overrides.length > 0 && { overrides }),
})

export default defineConfig()
