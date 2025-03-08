import conventionalConfig from '@commitlint/config-conventional'
import workspaceScopesConfig from '@commitlint/config-workspace-scopes'
import { isMonorepo } from '@pkgr/utils'

const MERGE_PROPERTIES = ['rules', 'utils']

export default isMonorepo()
  ? {
      ...conventionalConfig,
      ...MERGE_PROPERTIES.reduce((config, property) => {
        config[property] = {
          ...conventionalConfig[property],
          ...workspaceScopesConfig[property],
        }
        return config
      }, {}),
    }
  : conventionalConfig
