export const range = (n: number) => Array.from(Array(n).keys())
export function first<T>(xs: T[]) { return xs[0] }
export function last<T>(xs: T[]) { return xs[xs.length - 1] }
