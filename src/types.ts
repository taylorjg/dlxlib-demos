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

export enum CurrentState {
  Clean,
  Solving,
  Dirty
}
