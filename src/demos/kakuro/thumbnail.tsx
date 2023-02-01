import { first } from "utils"
import { KakuroDrawing } from "./drawing"
import { puzzles } from "./puzzles"

export const KakuroThumbnail = () => {
  const puzzle = first(puzzles)
  return <KakuroDrawing puzzle={puzzle} solutionInternalRows={[]} />
}
