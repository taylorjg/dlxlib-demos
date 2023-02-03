import { Coords, DrawingProps } from "types"
import { range } from "utils"
import { SudokuInternalRow } from "./internal-row"
import { Puzzle } from "./puzzle"

const VIEWBOX_WIDTH = 100
const VIEWBOX_HEIGHT = 100
const GRID_LINE_FULL_THICKNESS = 1
const GRID_LINE_HALF_THICKNESS = GRID_LINE_FULL_THICKNESS / 2
const GRID_LINE_COLOUR = "black"
const INITIAL_VALUE_COLOUR = "magenta"
const CALCULATED_VALUE_COLOUR = "black"
const SQUARE_WIDTH = (VIEWBOX_WIDTH - GRID_LINE_FULL_THICKNESS) / 9
const SQUARE_HEIGHT = (VIEWBOX_HEIGHT - GRID_LINE_FULL_THICKNESS) / 9

const calculateX = (col: number) => col * SQUARE_WIDTH + GRID_LINE_HALF_THICKNESS
const calculateY = (row: number) => row * SQUARE_HEIGHT + GRID_LINE_HALF_THICKNESS

export const SudokuDrawing: React.FC<DrawingProps<Puzzle, SudokuInternalRow>> = ({ puzzle, solutionInternalRows }) => {

  const drawBackground = (): JSX.Element => {
    return <rect x={0} y={0} width={VIEWBOX_WIDTH} height={VIEWBOX_HEIGHT} fill="white" />
  }

  const drawHorizontalGridLines = (): JSX.Element[] => {
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

  const drawVerticalGridLines = (): JSX.Element[] => {
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

  const drawInitiaValues = (): JSX.Element[] => {
    return puzzle.initialValues.map(initialValue =>
      drawValue(
        initialValue.coords,
        initialValue.value,
        true))
  }

  const drawCalculatedValues = (): JSX.Element[] => {
    return solutionInternalRows
      .filter(internalRow => !internalRow.isInitialValue)
      .map(internalRow =>
        drawValue(
          internalRow.coords,
          internalRow.value,
          false))
  }

  const drawValue = (coords: Coords, value: number, isInitialValue: boolean): JSX.Element => {
    const { row, col } = coords
    const cx = calculateX(col) + SQUARE_WIDTH / 2
    const cy = calculateY(row) + SQUARE_WIDTH / 2
    const fill = isInitialValue ? INITIAL_VALUE_COLOUR : CALCULATED_VALUE_COLOUR
    const fontSize = "8px"

    return (
      <text
        key={`value-${row}-${col}`}
        x={cx}
        y={cy}
        fill={fill}
        fontSize={fontSize}
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {value}
      </text>
    )
  }

  return (
    <svg viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}>
      {drawBackground()}
      {drawHorizontalGridLines()}
      {drawVerticalGridLines()}
      {drawInitiaValues()}
      {drawCalculatedValues()}
    </svg>
  )
}
