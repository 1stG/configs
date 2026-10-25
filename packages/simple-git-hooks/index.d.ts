export interface GitHooksOptions {
  /** Script runner used in the hook commands. */
  runner?: string
}

export type GitHooks = Record<string, string>

export declare const createHooks: (options?: GitHooksOptions) => GitHooks

declare const hooks: GitHooks

export default hooks
