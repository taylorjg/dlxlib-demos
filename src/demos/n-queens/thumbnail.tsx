import { last } from "utils"
import { Drawing } from "./drawing"
import { puzzles } from "./puzzles"
import { Puzzle } from "./puzzle"
import { NQueensInternalRow } from "./internal-row"

export const Thumbnail = () => {
  const puzzle = last(puzzles)
  const solutionInternalRows = makeSolution(puzzle)
  return <Drawing puzzle={puzzle} solutionInternalRows={solutionInternalRows} />
}

const makeSolution = (puzzle: Puzzle): NQueensInternalRow[] => {
  return [
    makeInternalRow(puzzle, 0, 0),
    makeInternalRow(puzzle, 1, 4),
    makeInternalRow(puzzle, 2, 7),
    makeInternalRow(puzzle, 3, 5),
    makeInternalRow(puzzle, 4, 2),
    makeInternalRow(puzzle, 5, 6),
    makeInternalRow(puzzle, 6, 1),
    makeInternalRow(puzzle, 7, 3)
  ]
}

const makeInternalRow = (puzzle: Puzzle, row: number, col: number): NQueensInternalRow => {
  const coords = { row, col }
  return { puzzle, coords }
}
