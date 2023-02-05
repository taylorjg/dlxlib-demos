import { sameCoords } from "types"
import { first, range } from "utils"
import { Drawing } from "./drawing"
import { InternalRow } from "./internal-row"
import { Puzzle } from "./puzzle"
import { puzzles } from "./puzzles"

export const Thumbnail = () => {
  const puzzle = first(puzzles)
  const solution = [
    "614892753",
    "893517264",
    "257346918",
    "432185679",
    "569274381",
    "781639542",
    "375428196",
    "146953827",
    "928761435"
  ]
  const solutionInternalRows = parseSolution(puzzle, solution)
  const drawingOptions = {}
  return (
    <Drawing
      puzzle={puzzle}
      solutionInternalRows={solutionInternalRows}
      drawingOptions={drawingOptions}
    />
  )
}

const parseSolution = (puzzle: Puzzle, solution: string[]): InternalRow[] => {
  const internalRows: InternalRow[] = []
  const size = solution.length
  for (const row of range(size)) {
    for (const col of range(size)) {
      const ch = solution[row][col]
      const value = Number(ch)
      if (Number.isInteger(value)) {
        const coords = { row, col }
        const isInitialValue = puzzle.initialValues.findIndex(initialValue =>
          sameCoords(initialValue.coords, coords)) >= 0
        const internalRow = { coords, value, isInitialValue }
        internalRows.push(internalRow)
      }
    }
  }
  return internalRows
}
