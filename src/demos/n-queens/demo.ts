import { IDemo } from "types"
import { range } from "utils"
import { NQueensInternalRow } from "./internal-row"

const SIZE = 8

export class NQueensDemo implements IDemo<NQueensInternalRow> {
  buildInternalRows(/* demoSettings */): NQueensInternalRow[] {
    const allLocations = range(SIZE).flatMap(row =>
      range(SIZE).map(col =>
        ({ row, col })))
    return allLocations.map(coords => ({ coords }))
  }

  getNumPrimaryColumns(/* demoSettings */): number | undefined {
    return SIZE + SIZE
  }

  internalRowToMatrixRow(internalRow: NQueensInternalRow): number[] {
    const { row, col } = internalRow.coords
    const diagonalColumnCount = SIZE + SIZE - 3

    const rowColumns = Array(SIZE).fill(0)
    const colColumns = Array(SIZE).fill(0)
    const diagonal1Columns = Array(diagonalColumnCount).fill(0)
    const diagonal2Columns = Array(diagonalColumnCount).fill(0)

    rowColumns[row] = 1
    colColumns[col] = 1

    const diagonal1 = row + col - 1
    if (diagonal1 >= 0 && diagonal1 < diagonalColumnCount) diagonal1Columns[diagonal1] = 1

    const diagonal2 = SIZE - 1 - col + row - 1
    if (diagonal2 >= 0 && diagonal2 < diagonalColumnCount) diagonal2Columns[diagonal2] = 1

    return rowColumns
      .concat(colColumns)
      .concat(diagonal1Columns)
      .concat(diagonal2Columns)
  }
}
