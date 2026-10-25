export type Formatter = false | 'oxfmt' | 'prettier' | 'both'
export type Linter = false | 'oxlint' | 'eslint'
export type Typecheck = false | 'tsc' | 'ngc' | 'vue-tsc'

export interface NanoStagedOptions {
  /** Command overrides, e.g. to pass a config file. */
  commands?: Partial<
    Record<'oxfmt' | 'oxlint' | 'prettier' | 'stylelint', string>
  >
  /** Base directory used to resolve `tsconfig`. @default process.cwd() */
  cwd?: string
  /** Formatter(s) to run. @default 'prettier' */
  formatter?: Formatter
  /** Linter to run before formatting. @default false */
  linter?: Linter
  /** Run `stylelint --fix` on style files. @default false */
  stylelint?: boolean
  /** Type-check command to run. @default false */
  typecheck?: Typecheck
  /** Explicit `tsconfig` path; discovered from `cwd` when omitted. */
  tsconfig?: string
  /** Run `type-coverage` together with the type-check. @default false */
  typeCoverage?: boolean
  /** Optimize image files with the `i` command. @default false */
  imagemagick?: boolean
}

export type Task = string | string[] | (() => string | string[])
export type StagedConfig = Record<string, Task>

export declare const createStaged: (options?: NanoStagedOptions) => StagedConfig

declare const config: StagedConfig

export default config
