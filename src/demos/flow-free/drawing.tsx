import { DrawingProps } from "types"
import { InternalRow } from "./internal-row"
import { Puzzle } from "./puzzle"

const VIEWBOX_WIDTH = 100
const VIEWBOX_HEIGHT = 100

export const Drawing: React.FC<DrawingProps<Puzzle, InternalRow>> = ({ puzzle, solutionInternalRows }) => {

  const drawBackground = (): JSX.Element => {
    return <rect x={0} y={0} width={VIEWBOX_WIDTH} height={VIEWBOX_HEIGHT} fill="black" />
  }

  return (
    <svg viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}>
      {drawBackground()}
      {/* DrawGrid() */}
      {/* DrawColourPairDots() */}
      {/* DrawPipes() */}
      {/* DrawColourPairLabels() */}
      </svg>
  )
}
