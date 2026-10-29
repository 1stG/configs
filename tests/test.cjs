// @ts-check

const { performance } = require('node:perf_hooks')

const DEFAULT_RUN_TIMES = 1000
const RUN_TIMES = +(process.env.RUN_TIMES || DEFAULT_RUN_TIMES)

/**
 * @param {string} name
 *
 * @typedef {{ loadTime: number; runTime: number; totalTime: number } | void} PerfResult
 * @returns {PerfResult | void} Perf result
 */
exports.perfCase = name => {
  const loadStartTime = performance.now()

  let syncFn

  try {
    syncFn = require(`./${name}.cjs`)
  } catch {
    return
  }

  const loadTime = performance.now() - loadStartTime

  let i = RUN_TIMES

  const runStartTime = performance.now()

  while (i-- > 0) {
    syncFn(__filename)
  }

  const runTime = performance.now() - runStartTime

  return {
    loadTime,
    runTime,
    totalTime: runTime + loadTime,
  }
}
