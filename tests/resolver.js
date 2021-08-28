const enhancedResolve = require('enhanced-resolve')

module.exports = (id, options) => {
  try {
    return options.defaultResolver(id, options)
  } catch {
    return enhancedResolve.sync(id, options.basedir)
  }
}
