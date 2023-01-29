import { DrawingProps } from "types"
import { range } from "utils"
import { SudokuInternalRow } from "./internal-row"

const VIEWBOX_WIDTH = 100
const VIEWBOX_HEIGHT = 100
const GRID_LINE_FULL_THICKNESS = 1
const GRID_LINE_HALF_THICKNESS = GRID_LINE_FULL_THICKNESS / 2
const GRID_LINE_COLOUR = "black"
const SQUARE_WIDTH = (VIEWBOX_WIDTH - GRID_LINE_FULL_THICKNESS) / 9
const SQUARE_HEIGHT = (VIEWBOX_HEIGHT - GRID_LINE_FULL_THICKNESS) / 9

const calculateX = (col: number) => col * SQUARE_WIDTH + GRID_LINE_HALF_THICKNESS
const calculateY = (row: number) => row * SQUARE_HEIGHT + GRID_LINE_HALF_THICKNESS

export const SudokuDrawing: React.FC<DrawingProps<SudokuInternalRow>> = () => {
  const renderHorizontalGridLines = (): JSX.Element[] => {
    const rows = range(10)
    return rows.map(row => {
      const y = calculateY(row)
      const isThickLine = row % 3 === 0
      return (
        <line
          key={`horizontal-grid-line-${row}`}
          x1={0}
          y1={y}
          x2={VIEWBOX_WIDTH}
          y2={y}
          strokeWidth={isThickLine ? GRID_LINE_FULL_THICKNESS : GRID_LINE_HALF_THICKNESS}
          stroke={GRID_LINE_COLOUR}
        />
      )
    })
  }

  const renderVerticalGridLines = (): JSX.Element[] => {
    const cols = range(10)
    return cols.map(col => {
      const x = calculateX(col)
      const isThickLine = col % 3 === 0
      return (
        <line
          key={`vertical-grid-line-${col}`}
          x1={x}
          y1={0}
          x2={x}
          y2={VIEWBOX_HEIGHT}
          strokeWidth={isThickLine ? GRID_LINE_FULL_THICKNESS : GRID_LINE_HALF_THICKNESS}
          stroke={GRID_LINE_COLOUR}
        />
      )
    })
  }

  return (
    <svg viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}>
      <rect x={0} y={0} width={VIEWBOX_WIDTH} height={VIEWBOX_HEIGHT} fill="white" />
      {renderHorizontalGridLines()}
      {renderVerticalGridLines()}
    </svg>
  )
}
