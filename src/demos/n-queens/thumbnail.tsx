import { last } from "utils"
import { NQueensDrawing } from "./drawing"
import { puzzles } from "./puzzles"

export const NQueensThumbnail = () => {
  const puzzle = last(puzzles)
  return <NQueensDrawing puzzle={puzzle} solutionInternalRows={[]} />
}
