import { KakuroDrawing } from "./drawing"
import { Puzzle } from "./puzzle"

export const fakePuzzle: Puzzle = {
  size: 10,
  blocks: [],
  clues: [],
  unknowns: [],
  horizontalRuns: [],
  verticalRuns: []
}

export const KakuroThumbnail = () => {
  return <KakuroDrawing puzzle={fakePuzzle} solutionInternalRows={[]} />
}
