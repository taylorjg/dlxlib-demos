import { first } from "utils"
import { Drawing } from "./drawing"
import { puzzles } from "./puzzles"

export const Thumbnail = () => {
  const puzzle = first(puzzles)
  const drawingOptions = { showClues: true }
  return (
    <Drawing
      puzzle={puzzle}
      solutionInternalRows={[]}
      drawingOptions={drawingOptions}
    />
  )
}
