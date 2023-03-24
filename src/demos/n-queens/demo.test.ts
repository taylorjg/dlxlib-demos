import { Demo } from "./demo"
import { InternalRow } from "./internal-row"
import { Puzzle } from "./puzzle"
import { findFirstSolution } from "test-helpers"

const checkSolution = (puzzle: Puzzle, internalRows: InternalRow[]): void => {
  expect(internalRows).toHaveLength(puzzle.size)
  checkRows(puzzle, internalRows)
  checkCols(puzzle, internalRows)
  checkDiagonalsUpperLeftToLowerRight(puzzle, internalRows)
  checkDiagonalsUpperRightToLowerLeft(puzzle, internalRows)
}

const checkRows = (puzzle: Puzzle, internalRows: InternalRow[]): void => {
  const distinctRows = Array.from(new Set(internalRows.map(internalRow => internalRow.coords.row)))
  expect(distinctRows).toHaveLength(puzzle.size)
}

const checkCols = (puzzle: Puzzle, internalRows: InternalRow[]): void => {
  const distinctCols = Array.from(new Set(internalRows.map(internalRow => internalRow.coords.col)))
  expect(distinctCols).toHaveLength(puzzle.size)
}

const checkDiagonalsUpperLeftToLowerRight = (puzzle: Puzzle, internalRows: InternalRow[]): void => {
  // TODO
}

const checkDiagonalsUpperRightToLowerLeft = (puzzle: Puzzle, internalRows: InternalRow[]): void => {
  // TODO
}

describe("N-Queens Demo tests", () => {
  it("can find a valid solution", () => {
    const demo = new Demo()
    const puzzle = { size: 8 }
    const solutionInternalRows = findFirstSolution(demo, puzzle)
    checkSolution(puzzle, solutionInternalRows)
  })
})
