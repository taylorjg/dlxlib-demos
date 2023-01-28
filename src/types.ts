import { NQueensInternalRow } from "demos/n-queens/internal-row"

export type AvailableDemo = {
  name: string,
  shortName: string,
  id: number
}

export type DrawingProps = {
  solutionInternalRows: NQueensInternalRow[]
}
