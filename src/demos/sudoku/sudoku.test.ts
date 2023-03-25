import { findFirstSolution } from "test-helpers"
import { distinct, first, range } from "utils"
import { Demo } from "./demo"
import { InternalRow } from "./internal-row"
import { Puzzle } from "./puzzle"
import { makeThumbnailSolution } from "./thumbnail"
import { puzzles } from "./puzzles"

describe("sudoku tests", () => {
  it("can find a valid solution", () => {
    const demo = new Demo()
    const puzzle = first(puzzles)
    const solutionInternalRows = findFirstSolution(demo, puzzle)
    checkSolution(puzzle, solutionInternalRows)
  })

  it("has a valid thumbnail solution", () => {
    const { puzzle, solutionInternalRows } = makeThumbnailSolution()
    checkSolution(puzzle, solutionInternalRows)
  })
})

const checkSolution = (puzzle: Puzzle, internalRows: InternalRow[]): void => {
  expect(internalRows).toHaveLength(81)
  checkRows(puzzle, internalRows)
  checkCols(puzzle, internalRows)
  checkBoxes(puzzle, internalRows)
}

const checkRows = (puzzle: Puzzle, internalRows: InternalRow[]): void => {
  for (const row of range(9)) {
    const values: number[] = []
    for (const internalRow of internalRows) {
      if (internalRow.coords.row === row) {
        const { value } = internalRow
        expect(value).toBeGreaterThanOrEqual(1)
        expect(value).toBeLessThanOrEqual(9)
        values.push(value)
      }
    }
    expect(distinct(values)).toHaveLength(9)
  }
}

const checkCols = (puzzle: Puzzle, internalRows: InternalRow[]): void => {
  for (const col of range(9)) {
    const values: number[] = []
    for (const internalRow of internalRows) {
      if (internalRow.coords.col === col) {
        const { value } = internalRow
        expect(value).toBeGreaterThanOrEqual(1)
        expect(value).toBeLessThanOrEqual(9)
        values.push(value)
      }
    }
    expect(distinct(values)).toHaveLength(9)
  }
}

const checkBoxes = (puzzle: Puzzle, internalRows: InternalRow[]): void => {
  for (const box of range(9)) {
    const rowFrom = Math.floor(box / 3) * 3
    const rowTo = rowFrom + 2
    const colFrom = box % 3 * 3
    const colTo = colFrom + 2

    const values: number[] = []
    for (const internalRow of internalRows) {
      const { row, col } = internalRow.coords
      if (row >= rowFrom && row <= rowTo && col >= colFrom && col <= colTo) {
        const { value } = internalRow
        expect(value).toBeGreaterThanOrEqual(1)
        expect(value).toBeLessThanOrEqual(9)
        values.push(value)
      }
    }
    expect(distinct(values)).toHaveLength(9)
  }
}
