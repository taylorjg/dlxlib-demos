import { Coords, DrawingProps } from "types"
import { range } from "utils"
import { DrawingOptions } from "./demo-controls"
import { InternalRow } from "./internal-row"
import { Orientation } from "./orientation"

const VIEWBOX_WIDTH = 100
const VIEWBOX_HEIGHT = 100

const GRID_LINE_FULL_THICKNESS = 1
const GRID_LINE_HALF_THICKNESS = GRID_LINE_FULL_THICKNESS / 2

const GRID_LINE_COLOUR = "#CD853F80"
const FALLBACK_PIECE_COLOUR = "white"
const LABEL_COLOUR = "white"

const LABEL_FONT_SIZE = 3

const SQUARE_WIDTH = (VIEWBOX_WIDTH - GRID_LINE_FULL_THICKNESS) / 8
const SQUARE_HEIGHT = (VIEWBOX_HEIGHT - GRID_LINE_FULL_THICKNESS) / 8

// const GAP = 2
// const HALF_GAP = GAP / 2

const calculateX = (col: number) => col * SQUARE_WIDTH + GRID_LINE_HALF_THICKNESS
const calculateY = (row: number) => row * SQUARE_HEIGHT + GRID_LINE_HALF_THICKNESS

const pieceColours = new Map<string, string>([
  ["F", "#CCCCE5"],
  ["I", "#650205"],
  ["L", "#984D11"],
  ["N", "#FFFD38"],
  ["P", "#FD8023"],
  ["T", "#FC2028"],
  ["U", "#7F1CC9"],
  ["V", "#6783E3"],
  ["W", "#0F7F12"],
  ["X", "#FC1681"],
  ["Y", "#29FD2F"],
  ["Z", "#CCCA2A"]
])

export const Drawing: React.FC<DrawingProps<{}, InternalRow, DrawingOptions>> = ({
  solutionInternalRows,
  drawingOptions,
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
    const colour = pieceColours.get(label) ?? FALLBACK_PIECE_COLOUR
    return internalRow.variation.coordsList.flatMap(coords => {
      const actualRow = internalRow.location.row + coords.row
      const actualCol = internalRow.location.col + coords.col
      const actualCoords = { row: actualRow, col: actualCol }
      return [drawSquare(actualCoords, colour)].concat(drawLabel(actualCoords, label))
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

  const drawCentreHole = (): JSX.Element[] => {

    if (solutionInternalRows.length === 0) return []

    const fakeLabel = ""
    const fakeCoordsList = [
      { row: 0, col: 0 },
      { row: 1, col: 0 },
      { row: 1, col: 1 },
      { row: 0, col: 1 }
    ]
    const fakeVariation = {
      orientation: Orientation.North,
      reflected: false,
      coordsList: fakeCoordsList
    }
    const fakeLocation = { row: 3, col: 3 }
    const fakeInternalRow = {
      label: fakeLabel,
      variation: fakeVariation,
      location: fakeLocation
    }
    return drawPiece(fakeInternalRow)
  }

  const drawLabel = (coords: Coords, label: string): JSX.Element[] => {

    if (!drawingOptions.showLabels) return []

    const { row, col } = coords
    const cx = calculateX(col) + SQUARE_WIDTH / 2
    const cy = calculateY(row) + SQUARE_WIDTH / 2

    const text =
      <text
        key={`value-${row}-${col}`}
        x={cx}
        y={cy}
        fill={LABEL_COLOUR}
        filter="url(#text-shadow)"
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
      <defs>
        <filter id="text-shadow">
          <feDropShadow dx="0.2" dy="0.4" stdDeviation="0.2" />
        </filter>
      </defs>
      {drawHorizontalGridLines()}
      {drawVerticalGridLines()}
      {drawCentreHole()}
      {drawPieces()}
    </svg>
  )
}
