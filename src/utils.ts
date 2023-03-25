export const range = (n: number): number[] => Array.from(Array(n).keys())
export const sum = (ns: number[]): number => ns.reduce((acc, n) => acc + n, 0)
export const min = (ns: number[]): number => Math.min(...ns)
export const max = (ns: number[]): number => Math.max(...ns)
export function minBy<T>(xs: T[], selector: (x: T) => number): number { return min(xs.map(selector)) }
export function maxBy<T>(xs: T[], selector: (x: T) => number): number { return max(xs.map(selector)) }
export function first<T>(xs: T[]): T { return xs[0] }
export function last<T>(xs: T[]): T { return xs[xs.length - 1] }
export function distinct<T>(xs: T[]): T[] { return Array.from(new Set(xs)) }

function defaultSameness<T>(x1: T, x2: T): boolean { return x1 === x2 }

export function except<T>(xs1: T[], xs2: T[], isSame: (x1: T, x2: T) => boolean = defaultSameness): T[] {
  return xs1.filter(x1 => !xs2.some(x2 => isSame(x1, x2)))
}

export function union<T>(xs1: T[], xs2: T[], isSame: (x1: T, x2: T) => boolean = defaultSameness): T[] {
  return [...xs1].concat(xs2.filter(x2 => !xs1.some(x1 => isSame(x1, x2))))
}

export function intersect<T>(xs1: T[], xs2: T[], isSame: (x1: T, x2: T) => boolean = defaultSameness): T[] {
  const firstsInSecond = xs1.filter(x1 => xs2.some(x2 => isSame(x1, x2)))
  const secondsInFirst = xs2.filter(x2 => xs1.some(x1 => isSame(x1, x2)))
  return union(firstsInSecond, secondsInFirst, isSame)
}

export const reverseString = (s: string): string => Array.from(s).reverse().join("")
