export const range = (n: number) => Array.from(Array(n).keys())
export const sum = (ns: number[]): number => ns.reduce((acc, n) => acc + n, 0)
export const min = (ns: number[]): number => Math.min(...ns)
export const max = (ns: number[]): number => Math.max(...ns)
export function minBy<T>(xs: T[], selector: (x: T) => number): number { return min(xs.map(selector)) }
export function maxBy<T>(xs: T[], selector: (x: T) => number): number { return max(xs.map(selector)) }
export function first<T>(xs: T[]) { return xs[0] }
export function last<T>(xs: T[]) { return xs[xs.length - 1] }
