import { Coords, IDemo } from "types"
import { range, sameCoords } from "utils"
import { InitialValue } from "./initial-value"
import { SudokuInternalRow } from "./internal-row"
import { Puzzle } from "./puzzle"

export class SudokuDemo implements IDemo<Puzzle, SudokuInternalRow> {
  buildInternalRows(puzzle: Puzzle): SudokuInternalRow[] {
    const allCoords = range(9).flatMap(row => range(9).map(col => ({ row, col })))
    return allCoords.flatMap(coords => {
      const initialValue = puzzle.initialValues.find(iv => sameCoords(iv.coords, coords))
      return initialValue
        ? this._buildInternalRowsForInitialValue(initialValue)
        : this._buildInternalRowsForCoords(coords)
    })
  }

  _buildInternalRowsForInitialValue(initialValue: InitialValue): SudokuInternalRow[] {
    return [{ ...initialValue, isInitialValue: true }]
  }

  _buildInternalRowsForCoords(coords: Coords): SudokuInternalRow[] {
    return range(9).map(n => n + 1).map(value => ({
      coords,
      value,
      isInitialValue: false
    }))
  }

  internalRowToMatrixRow(internalRow: SudokuInternalRow): number[] {
    const { row, col } = internalRow.coords
    const box = this._rowColToBox(row, col);
    const zeroBasedValue = internalRow.value - 1
    const posColumns = this._oneHot(row, col);
    const rowColumns = this._oneHot(row, zeroBasedValue);
    const colColumns = this._oneHot(col, zeroBasedValue);
    const boxColumns = this._oneHot(box, zeroBasedValue);
    return posColumns
      .concat(rowColumns)
      .concat(colColumns)
      .concat(boxColumns)
  }

  _oneHot(major: number, minor: number): number[] {
    const columns = Array(81).fill(0)
    columns[major * 9 + minor] = 1
    return columns
  }

  _rowColToBox(row: number, col: number): number {
    return Math.floor(row - (row % 3) + (col / 3))
  }

  getNumPrimaryColumns(puzzle: Puzzle): number | undefined {
    return undefined
  }
}
