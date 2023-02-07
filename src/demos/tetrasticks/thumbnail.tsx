import { Orientation } from "./orientation"
import { Drawing } from "./drawing"
import { InternalRow } from "./internal-row"
import { piecesWithVariations } from "./pieces-with-variations"

export const Thumbnail = () => {
  const solutionInternalRows = makeSolution()
  return (
    <Drawing
      puzzle={{}}
      solutionInternalRows={solutionInternalRows}
      drawingOptions={{}}
    />
  )
}

const makeSolution = (): InternalRow[] => {
  return [
    makeSolutionInternalRow("F", Orientation.West, true, 4, 3),
    makeSolutionInternalRow("I", Orientation.East, false, 0, 0),
    makeSolutionInternalRow("J", Orientation.North, true, 3, 0),
    makeSolutionInternalRow("L", Orientation.North, false, 0, 0),
    makeSolutionInternalRow("N", Orientation.West, true, 4, 2),
    makeSolutionInternalRow("O", Orientation.North, false, 0, 4),
    makeSolutionInternalRow("P", Orientation.South, true, 2, 2),
    makeSolutionInternalRow("R", Orientation.South, true, 0, 2),
    makeSolutionInternalRow("T", Orientation.South, false, 2, 0),
    makeSolutionInternalRow("U", Orientation.East, true, 3, 1),
    makeSolutionInternalRow("V", Orientation.North, true, 0, 0),
    makeSolutionInternalRow("W", Orientation.East, true, 2, 2),
    makeSolutionInternalRow("X", Orientation.North, false, 0, 0),
    makeSolutionInternalRow("Y", Orientation.North, false, 1, 4),
    makeSolutionInternalRow("Z", Orientation.North, false, 1, 3)
  ]
}

const makeSolutionInternalRow = (
  label: string,
  orientation: Orientation,
  reflected: boolean,
  row: number,
  col: number
): InternalRow => {

  for (const pwv of piecesWithVariations) {
    if (pwv.label === label) {
      const variation = pwv.variations.find(v => v.orientation === orientation && v.reflected === reflected)
      if (variation) {
        const location = { row, col }
        return { label, variation, location }
      }
    }
  }
  throw new Error("[makeSolutionInternalRow] failed to find variation")
}
