import { Demo } from "./demo"
import { InternalRow } from "./internal-row"
import { Puzzle } from "./puzzle"
import { makeThumbnailSolution } from "./thumbnail"
import { findFirstSolution } from "test-helpers"
import { distinct } from "utils"

const checkSolution = (puzzle: Puzzle, internalRows: InternalRow[]): void => {
  expect(internalRows).toHaveLength(puzzle.size)
  checkRows(puzzle, internalRows)
  checkCols(puzzle, internalRows)
  checkDiagonalsUpperLeftToLowerRight(puzzle, internalRows)
  checkDiagonalsUpperRightToLowerLeft(puzzle, internalRows)
}

const checkRows = (puzzle: Puzzle, internalRows: InternalRow[]): void => {
  const distinctRows = distinct(internalRows.map(internalRow => internalRow.coords.row))
  expect(distinctRows).toHaveLength(puzzle.size)
}

const checkCols = (puzzle: Puzzle, internalRows: InternalRow[]): void => {
  const distinctCols = distinct(internalRows.map(internalRow => internalRow.coords.col))
  expect(distinctCols).toHaveLength(puzzle.size)
}

const checkDiagonalsUpperLeftToLowerRight = (puzzle: Puzzle, internalRows: InternalRow[]): void => {
  // TODO
}

const checkDiagonalsUpperRightToLowerLeft = (puzzle: Puzzle, internalRows: InternalRow[]): void => {
  // TODO
}

describe("n-queens tests", () => {
  it("can find a valid solution", () => {
    const demo = new Demo()
    const puzzle = { size: 8 }
    const solutionInternalRows = findFirstSolution(demo, puzzle)
    checkSolution(puzzle, solutionInternalRows)
  })

  it("has a valid thumbnail solution", () => {
    const { puzzle, solutionInternalRows } = makeThumbnailSolution()
    checkSolution(puzzle, solutionInternalRows)
  })
})
