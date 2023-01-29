export type AvailableDemo = {
  name: string,
  shortName: string,
  id: number
}

export type DrawingProps<TInternalRow> = {
  solutionInternalRows: TInternalRow[]
}

export interface IDemo<TInternalRow> {
  buildInternalRows(): TInternalRow[]
  internalRowToMatrixRow(internalRow: TInternalRow): number[]
  getNumPrimaryColumns(): number | undefined
}
