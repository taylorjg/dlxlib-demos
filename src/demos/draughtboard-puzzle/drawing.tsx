import { Coords, DrawingProps } from "types"
import { range } from "utils"
import { Colour } from "./colour"
import { InternalRow } from "./internal-row"

const VIEWBOX_WIDTH = 100
const VIEWBOX_HEIGHT = 100

const GRID_LINE_FULL_THICKNESS = 1
const GRID_LINE_HALF_THICKNESS = GRID_LINE_FULL_THICKNESS / 2

const GRID_LINE_COLOUR = "#CD853F80"
const SQUARE_COLOUR_BLACK = "black"
const SQUARE_COLOUR_WHITE = "white"

const SQUARE_WIDTH = (VIEWBOX_WIDTH - GRID_LINE_FULL_THICKNESS) / 8
const SQUARE_HEIGHT = (VIEWBOX_HEIGHT - GRID_LINE_FULL_THICKNESS) / 8

const calculateX = (col: number) => col * SQUARE_WIDTH + GRID_LINE_HALF_THICKNESS
const calculateY = (row: number) => row * SQUARE_HEIGHT + GRID_LINE_HALF_THICKNESS

export const Drawing: React.FC<DrawingProps<{}, InternalRow>> = ({
  solutionInternalRows,
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
    return internalRow.variation.squares.map(square => {
      const { coords } = square
      const actualRow = internalRow.location.row + coords.row
      const actualCol = internalRow.location.col + coords.col
      const actualCoords = { row: actualRow, col: actualCol }
      const colour = square.colour === Colour.Black ? SQUARE_COLOUR_BLACK : SQUARE_COLOUR_WHITE
      return drawSquare(actualCoords, colour)
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

  return (
    <svg viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}>
      {drawHorizontalGridLines()}
      {drawVerticalGridLines()}
      {drawPieces()}
    </svg>
  )
}
