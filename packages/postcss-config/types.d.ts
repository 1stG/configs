declare module 'postcss-import' {
  import type { PluginCreator } from 'postcss'

  const plugin: PluginCreator<Record<string, unknown>>
  export default plugin
}

declare module 'postcss-normalize' {
  import type { PluginCreator } from 'postcss'

  const plugin: PluginCreator<Record<string, unknown>>
  export default plugin
}

declare module 'postcss-url' {
  import type { PluginCreator } from 'postcss'

  const plugin: PluginCreator<Record<string, unknown>>
  export default plugin
}
