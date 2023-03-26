import { sameCoords } from "types"
import { first, range } from "utils"
import { Drawing } from "./drawing"
import { InternalRow } from "./internal-row"
import { Puzzle } from "./puzzle"
import { puzzles } from "./puzzles"

export const Thumbnail = () => {
  const { puzzle, solutionInternalRows } = makeThumbnailSoution()
  const drawingOptions = {}

  return (
    <Drawing
      puzzle={puzzle}
      solutionInternalRows={solutionInternalRows}
      drawingOptions={drawingOptions}
    />
  )
}

export const makeThumbnailSoution = () => {
  const puzzle = first(puzzles)
  const solution = [
    "23124521",
    "61312432",
    "42131213",
    "35243121",
    "13121345",
    "21314231",
    "12432513",
    "34123121"
  ]
  const solutionInternalRows = parseSolution(puzzle, solution)
  return { puzzle, solutionInternalRows }
}

const parseSolution = (puzzle: Puzzle, solution: string[]): InternalRow[] => {
  const internalRows: InternalRow[] = []
  const size = solution.length
  for (const row of range(size)) {
    for (const col of range(size)) {
      const cell = { row, col }
      const value = Number(solution[row][col])
      const isInitialValue = puzzle.initialValues.some(initialValue => sameCoords(initialValue.cell, cell))
      const room = puzzle.rooms.find(room => room.cells.some(roomCell => sameCoords(roomCell, cell)))!
      const internalRow = { puzzle, cell, value, isInitialValue, room }
      internalRows.push(internalRow)
    }
  }
  return internalRows
}
