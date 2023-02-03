export type AvailableDemo = {
  name: string,
  shortName: string,
  Thumbnail: React.FC,
}

export type DrawingProps<TPuzzle, TInternalRow> = {
  puzzle: TPuzzle,
  solutionInternalRows: TInternalRow[]
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

export enum CurrentState {
  Clean,
  Solving,
  Dirty
}
