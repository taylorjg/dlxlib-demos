import { IDemo } from "types"
import { InternalRow } from "./internal-row"
import { Puzzle } from "./puzzle"
import { findPaths } from "./pathFinder"

export class Demo implements IDemo<Puzzle, InternalRow> {

  buildInternalRows(puzzle: Puzzle): InternalRow[] {
    const internalRows: InternalRow[] = []
    for (const colourPair of puzzle.colourPairs) {
      const paths = findPaths(puzzle, colourPair)
      for (const coordsList of paths) {
        const internalRow = { puzzle, colourPair, coordsList }
        internalRows.push(internalRow)
      }
    }
    return internalRows
  }

  internalRowToMatrixRow(internalRow: InternalRow): number[] {
    const size = internalRow.puzzle.size
    const columns = Array(size * size).fill(0)
    for (const coords of internalRow.coordsList) {
      const index = coords.row * size + coords.col
      columns[index] = 1
    }
    return columns
  }

  getNumPrimaryColumns(puzzle: Puzzle): number | undefined {
    return undefined
  }
}
