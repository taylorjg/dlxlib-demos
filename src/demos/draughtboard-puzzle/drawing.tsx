import { Coords, DrawingProps } from "types"
import { range } from "utils"
import { Colour } from "./colour"
import { DrawingOptions } from "./demo-controls"
import { InternalRow } from "./internal-row"

const VIEWBOX_WIDTH = 100
const VIEWBOX_HEIGHT = 100

const GRID_LINE_FULL_THICKNESS = 1
const GRID_LINE_HALF_THICKNESS = GRID_LINE_FULL_THICKNESS / 2

// const GRID_LINE_COLOUR = "#CD853F80"
const GRID_LINE_COLOUR = "#CD853F"
const SQUARE_COLOUR_BLACK = "black"
const SQUARE_COLOUR_WHITE = "white"

const LABEL_FONT_SIZE = 3

const SQUARE_WIDTH = (VIEWBOX_WIDTH - GRID_LINE_FULL_THICKNESS) / 8
const SQUARE_HEIGHT = (VIEWBOX_HEIGHT - GRID_LINE_FULL_THICKNESS) / 8

const calculateX = (col: number) => col * SQUARE_WIDTH + GRID_LINE_HALF_THICKNESS
const calculateY = (row: number) => row * SQUARE_HEIGHT + GRID_LINE_HALF_THICKNESS

export const Drawing: React.FC<DrawingProps<{}, InternalRow, DrawingOptions>> = ({
  solutionInternalRows,
  drawingOptions
}) => {

  const drawHorizontalGridLines = (): JSX.Element[] => {
    const rows = range(9)
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
    const cols = range(9)
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

  const drawPieces = (): JSX.Element[] => {
    return solutionInternalRows.flatMap(drawPiece)
  }

  const drawPiece = (internalRow: InternalRow): JSX.Element[] => {
    const { label } = internalRow
    return internalRow.variation.squares.flatMap(square => {
      const { coords } = square
      const actualRow = internalRow.location.row + coords.row
      const actualCol = internalRow.location.col + coords.col
      const actualCoords = { row: actualRow, col: actualCol }
      const colour = square.colour === Colour.Black ? SQUARE_COLOUR_BLACK : SQUARE_COLOUR_WHITE
      const inverseColour = square.colour === Colour.Black ? SQUARE_COLOUR_WHITE : SQUARE_COLOUR_BLACK
      return [drawSquare(actualCoords, colour)]
        .concat(drawLabel(actualCoords, label, inverseColour))
    })
  }

  const drawSquare = (coords: Coords, colour: string): JSX.Element => {
    const { row, col } = coords
    const x = calculateX(col)
    const y = calculateY(row)

    return (
      <rect
        key={`square-${row}-${col}`}
        x={x}
        y={y}
        width={SQUARE_WIDTH}
        height={SQUARE_HEIGHT}
        fill={colour}
      />
    )
  }

  const drawLabel = (coords: Coords, label: string, colour: string): JSX.Element[] => {

    if (!drawingOptions.showLabels) return []

    const { row, col } = coords
    const cx = calculateX(col) + SQUARE_WIDTH / 2
    const cy = calculateY(row) + SQUARE_WIDTH / 2

    const text =
      <text
        key={`label-${row}-${col}`}
        x={cx}
        y={cy}
        fill={colour}
        fontSize={LABEL_FONT_SIZE}
        textAnchor="middle"
        dominantBaseline="central"
      >
        {label}
      </text>

    return [text]
  }

  return (
    <svg viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}>
      {drawHorizontalGridLines()}
      {drawVerticalGridLines()}
      {drawPieces()}
    </svg>
  )
}
