export function timeIt<T>(label: string, fn: () => T): T {
  const startTime = performance.now()
  const result: T = fn()
  const endTime = performance.now()
  const elapsedTimeMs = endTime - startTime
  const elapsedTimeS = elapsedTimeMs / 1000
  console.log(`[${label}] elapsed time: ${elapsedTimeS.toLocaleString()}s`)
  return result
}
