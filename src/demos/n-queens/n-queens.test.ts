import { findFirstSolution } from "test-helpers"
import { Coords, sameCoords } from "types"
import { distinct, range } from "utils"
import { Demo } from "./demo"
import { InternalRow } from "./internal-row"
import { Puzzle } from "./puzzle"
import { makeThumbnailSolution } from "./thumbnail"

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
  const { size } = puzzle
  const diagonalColumnCount = size * 2 - 1

  for (const index of range(diagonalColumnCount)) {
    const diagonalCoords: Coords[] = []
    for (const row of range(size)) {
      for (const col of range(size)) {
        if (row + col === index) {
          diagonalCoords.push({ row, col })
        }
      }
    }
    const count = diagonalCoords
      .filter(coords => internalRows.some(internalRow => sameCoords(internalRow.coords, coords)))
      .length
    expect(count).toBeGreaterThanOrEqual(0)
    expect(count).toBeLessThanOrEqual(1)
  }
}

const checkDiagonalsUpperRightToLowerLeft = (puzzle: Puzzle, internalRows: InternalRow[]): void => {
  const { size } = puzzle
  const diagonalColumnCount = size * 2 - 1

  for (const index of range(diagonalColumnCount)) {
    const diagonalCoords: Coords[] = []
    for (const row of range(size)) {
      for (const col of range(size)) {
        if (size - 1 - col + row === index) {
          diagonalCoords.push({ row, col })
        }
      }
    }
    const count = diagonalCoords
      .filter(coords => internalRows.some(internalRow => sameCoords(internalRow.coords, coords)))
      .length
    expect(count).toBeGreaterThanOrEqual(0)
    expect(count).toBeLessThanOrEqual(1)
  }
}
