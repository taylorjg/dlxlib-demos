import { findFirstSolution } from "test-helpers"
import { distinct } from "utils"
import { Demo } from "./demo"
import { InternalRow } from "./internal-row"
import { makeThumbnailSolution } from "./thumbnail"
import { addCoords } from "types"
import { Colour } from "./colour"

describe("draughtboard-puzzle tests", () => {
  it("can find a valid solution", () => {
    const demo = new Demo()
    const puzzle = {}
    const solutionInternalRows = findFirstSolution(demo, puzzle)
    checkSolution(solutionInternalRows)
  })

  it("has a valid thumbnail solution", () => {
    const { solutionInternalRows } = makeThumbnailSolution()
    checkSolution(solutionInternalRows)
  })
})

const checkSolution = (internalRows: InternalRow[]): void => {
  expect(internalRows).toHaveLength(14)
  checkAllPiecesCovered(internalRows)
  checkAllSquaresCovered(internalRows)
  checkAllSquaresHaveCorrectColour(internalRows)
}

const checkAllPiecesCovered = (internalRows: InternalRow[]): void => {
  const allLabels = internalRows.map(internalRow => internalRow.label)
  expect(distinct(allLabels)).toHaveLength(14)
}

const checkAllSquaresCovered = (internalRows: InternalRow[]): void => {
  const allSquares = internalRows
    .flatMap(internalRow =>
      internalRow.variation.squares.map(square =>
        addCoords(internalRow.location, square.coords)))
    .map(({ row, col }) => `${row}:${col}`)

  expect(distinct(allSquares)).toHaveLength(64)
}

const checkAllSquaresHaveCorrectColour = (internalRows: InternalRow[]): void => {
  for (const internalRow of internalRows) {
    for (const square of internalRow.variation.squares) {
      const { row, col } = addCoords(internalRow.location, square.coords)
      const expectedColour = (row + col) % 2 === 0 ? Colour.Black : Colour.White
      expect(square.colour).toBe(expectedColour)
    }
  }
}
