import { first } from "utils"
import { Drawing } from "./drawing"
import { puzzles } from "./puzzles"
import { Puzzle } from "./puzzle"
import { InternalRow } from "./internal-row"

export const Thumbnail = () => {
  const puzzle = first(puzzles)
  const solutionInternalRows = makeSolution(puzzle)
  const drawingOptions = {}
  return (
    <Drawing
      puzzle={puzzle}
      solutionInternalRows={solutionInternalRows}
      drawingOptions={drawingOptions}
    />
  )
}

const makeSolution = (puzzle: Puzzle): InternalRow[] => {
  return puzzle.clues.map(clue => {
    const candidate = first(clue.candidates)
    return { puzzle, clue, candidate }
  })
}
