import { range } from "utils"

export type AvailableDemo = {
  name: string,
  shortName: string,
  Thumbnail: React.FC,
}

export type DrawingProps<TPuzzle, TInternalRow> = {
  puzzle: TPuzzle,
  solutionInternalRows: TInternalRow[]
}

export type DemoControlsProps<TPuzzle> = {
  selectedPuzzle: TPuzzle,
  onSelectedPuzzleChanged: (puzzle: TPuzzle) => void
}

export interface IDemo<TPuzzle, TInternalRow> {
  buildInternalRows(puzzle: TPuzzle): TInternalRow[]
  internalRowToMatrixRow(internalRow: TInternalRow): number[]
  getNumPrimaryColumns(puzzle: TPuzzle): number | undefined
}

export type Coords = {
  row: number,
  col: number
}

export const goUp = (coords: Coords): Coords => ({ row: coords.row - 1, col: coords.col })
export const goDown = (coords: Coords): Coords => ({ row: coords.row + 1, col: coords.col })
export const goLeft = (coords: Coords): Coords => ({ row: coords.row, col: coords.col - 1 })
export const goRight = (coords: Coords): Coords => ({ row: coords.row, col: coords.col + 1 })

export const sameCoords = (coords1: Coords, coords2: Coords): boolean =>
  coords1.row === coords2.row && coords1.col === coords2.col

export const sameCoordsList = (coordsList1: Coords[], coordsList2: Coords[]): boolean => {
  if (coordsList1.length !== coordsList2.length) return false
  for (const index of range(coordsList1.length)) {
    const coords1 = coordsList1[index]
    const coords2 = coordsList2[index]
    if (!sameCoords(coords1, coords2)) return false
  }
  return true
}

export enum CurrentState {
  Clean,
  Solving,
  Dirty
}
