import type { Config } from 'stylelint'

export interface StylelintConfigOptions {
  /** Ignore Angular-specific pseudo elements. @default false */
  angular?: boolean
  /** Ignore the CSS Modules pseudo classes. @default false */
  modules?: boolean
  /** Run Prettier as a Stylelint rule. @default false */
  prettier?: boolean
  /** Add the SCSS syntax and rules. @default false */
  scss?: boolean
  /** Add the SCSS syntax with the strict rules off. @default false */
  scssLoose?: boolean
  /** Ignore Vue-specific pseudo elements. @default false */
  vue?: boolean
}

export declare const defineConfig: (options?: StylelintConfigOptions) => Config

declare const config: Config

export default config
