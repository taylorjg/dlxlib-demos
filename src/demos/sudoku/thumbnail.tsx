import { sameCoords } from "types"
import { first, range } from "utils"
import { SudokuDrawing } from "./drawing"
import { SudokuInternalRow } from "./internal-row"
import { Puzzle } from "./puzzle"
import { puzzles } from "./puzzles"

export const SudokuThumbnail = () => {
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
  return <SudokuDrawing puzzle={puzzle} solutionInternalRows={solutionInternalRows} />
}

const parseSolution = (puzzle: Puzzle, solution: string[]): SudokuInternalRow[] => {
  const internalRows: SudokuInternalRow[] = []
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