import { first } from "utils"
import { SudokuDrawing } from "./drawing"
import { puzzles } from "./puzzles"

export const SudokuThumbnail = () => {
  const puzzle = first(puzzles)
  return <SudokuDrawing puzzle={puzzle} solutionInternalRows={[]} />
}
