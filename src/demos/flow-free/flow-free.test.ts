import { findFirstSolution } from "test-helpers"
import { distinct, first, range } from "utils"
import { Demo } from "./demo"
import { InternalRow } from "./internal-row"
import { makeThumbnailSolution } from "./thumbnail"
import { puzzles } from "./puzzles"
import { Puzzle } from "./puzzle"
import { Coords } from "types"

describe("flow-free tests", () => {
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
  expect(internalRows).toHaveLength(puzzle.colourPairs.length)
  checkAllSquaresCovered(puzzle, internalRows)
  checkPipes(internalRows)
}

const checkAllSquaresCovered = (puzzle: Puzzle, internalRows: InternalRow[]): void => {
  const allSquares = internalRows
    .flatMap(internalRow => internalRow.coordsList)
    .map(({ row, col }) => `${row}:${col}`)
  expect(distinct(allSquares)).toHaveLength(puzzle.size * puzzle.size)
}

const checkPipes = (internalRows: InternalRow[]): void => {
  for (const internalRow of internalRows) {
    checkPipe(internalRow.coordsList)
  }
}

const checkPipe = (coordsList: Coords[]): void => {
  for (const index of range(coordsList.length).slice(1)) {
    const currCoords = coordsList[index]
    const prevCoords = coordsList[index - 1]
    const rowDiff = Math.abs(currCoords.row - prevCoords.row)
    const colDiff = Math.abs(currCoords.col - prevCoords.col)
    const manhattanDistance = rowDiff + colDiff
    expect(manhattanDistance).toBe(1)
  }
}
