import { DrawingProps } from "types"
import { range, max } from "utils"
import { InternalRow } from "./internal-row"
import { Puzzle } from "./puzzle"

const VIEWBOX_WIDTH = 100
const VIEWBOX_HEIGHT = 100

export const Drawing: React.FC<DrawingProps<Puzzle, InternalRow>> = ({
  puzzle
}) => {
  const GRID_LINE_FULL_THICKNESS = 1 / 4
  const GRID_LINE_HALF_THICKNESS = GRID_LINE_FULL_THICKNESS / 2
  const GRID_LINE_COLOUR = "black"
  const maxNumRunGroupsHorizontally = max(puzzle.horizontalRunGroups.map(rg => rg.lengths.length))
  const maxNumRunGroupsVertically = max(puzzle.verticalRunGroups.map(rg => rg.lengths.length))
  const numMarginSquares = Math.max(maxNumRunGroupsHorizontally, maxNumRunGroupsVertically)
  const sizeWithMargin = numMarginSquares + puzzle.size

  const SQUARE_WIDTH = (VIEWBOX_WIDTH - GRID_LINE_FULL_THICKNESS) / sizeWithMargin
  const SQUARE_HEIGHT = (VIEWBOX_HEIGHT - GRID_LINE_FULL_THICKNESS) / sizeWithMargin

  const calculateX = (col: number) => (numMarginSquares + col) * SQUARE_WIDTH + GRID_LINE_HALF_THICKNESS
  const calculateY = (row: number) => (numMarginSquares + row) * SQUARE_HEIGHT + GRID_LINE_HALF_THICKNESS

  const drawBackground = (): JSX.Element => {
    return <rect x={0} y={0} width={VIEWBOX_WIDTH} height={VIEWBOX_HEIGHT} fill="white" />
  }

  const drawHorizontalGridLines = (): JSX.Element[] => {
    const rows = range(puzzle.size + 1)
    return rows.map(row => {
      const y = calculateY(row)
      return (
        <line
          key={`horizontal-grid-line-${row}`}
          x1={0}
          y1={y}
          x2={VIEWBOX_WIDTH}
          y2={y}
          strokeWidth={GRID_LINE_FULL_THICKNESS}
          stroke={GRID_LINE_COLOUR}
        />
      )
    })
  }

  const drawVerticalGridLines = (): JSX.Element[] => {
    const cols = range(puzzle.size + 1)
    return cols.map(col => {
      const x = calculateX(col)
      return (
        <line
          key={`vertical-grid-line-${col}`}
          x1={x}
          y1={0}
          x2={x}
          y2={VIEWBOX_HEIGHT}
          strokeWidth={GRID_LINE_FULL_THICKNESS}
          stroke={GRID_LINE_COLOUR}
        />
      )
    })
  }

  return (
    <svg viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}>
      {drawBackground()}
      {drawHorizontalGridLines()}
      {drawVerticalGridLines()}
    </svg>
  )
}
