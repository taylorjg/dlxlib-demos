import { Coords } from "types"

export const range = (n: number) => Array.from(Array(n).keys())

export const sameCoords = (coords1: Coords, coords2: Coords): boolean =>
  coords1.row === coords2.row && coords1.col === coords2.col
