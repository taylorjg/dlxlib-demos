import { first } from "utils"
import { Drawing } from "./drawing"
import { puzzles } from "./puzzles"

export const Thumbnail = () => {
  const { puzzle, solutionInternalRows } = makeThumbnailSolution()
  const drawingOptions = { showClueNumbers: false }
  return (
    <Drawing
      puzzle={puzzle}
      solutionInternalRows={solutionInternalRows}
      drawingOptions={drawingOptions}
    />
  )
}

export const makeThumbnailSolution = () => {
  const puzzle = first(puzzles)
  const solutionInternalRows = puzzle.clues.map(clue => {
    const candidate = first(clue.candidates)
    return { puzzle, clue, candidate }
  })
  return { puzzle, solutionInternalRows }
}
