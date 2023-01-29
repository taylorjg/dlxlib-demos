import { IDemo } from "types"
// import { range } from "utils"
import { SudokuInternalRow } from "./internal-row"

export class SudokuDemo implements IDemo<SudokuInternalRow> {
  buildInternalRows(/* demoSettings */): SudokuInternalRow[] {
    return []
  }

  internalRowToMatrixRow(internalRow: SudokuInternalRow): number[] {
    return []
  }

  getNumPrimaryColumns(/* demoSettings */): number | undefined {
    return undefined
  }
}
