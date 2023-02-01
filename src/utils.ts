import { Coords } from "types"

export const range = (n: number) => Array.from(Array(n).keys())

export function first<T>(xs: T[]) { return xs[0] }
export function last<T>(xs: T[]) { return xs[xs.length - 1] }

export const sameCoords = (coords1: Coords, coords2: Coords): boolean =>
  coords1.row === coords2.row && coords1.col === coords2.col
