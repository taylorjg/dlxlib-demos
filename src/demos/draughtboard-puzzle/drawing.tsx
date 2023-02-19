import { Coords, DrawingProps, Point } from "types"
import { range } from "utils"
import { gatherOutsideEdges, outsideEdgesToBorderLocations } from "drawing-utils"
import { PathCommands } from "path-commands"
import { Colour } from "./colour"
import { DrawingOptions } from "./demo-controls"
import { InternalRow } from "./internal-row"

const VIEWBOX_WIDTH = 100
const VIEWBOX_HEIGHT = 100

const GRID_LINE_FULL_THICKNESS = 1
const GRID_LINE_HALF_THICKNESS = GRID_LINE_FULL_THICKNESS / 2

const GRID_LINE_COLOUR = "#CCCCCC"
const BLACK_SQUARE_BACKGROUND_COLOUR = "#CCCCCC20"
const WHITE_SQUARE_BACKGROUND_COLOUR = "#CCCCCC60"
const SQUARE_COLOUR_BLACK = "black"
const SQUARE_COLOUR_WHITE = "white"
const PIECE_BORDER_COLOUR = "#0066CC"

const LABEL_FONT_SIZE = 3

const SQUARE_WIDTH = (VIEWBOX_WIDTH - GRID_LINE_FULL_THICKNESS) / 8
const SQUARE_HEIGHT = (VIEWBOX_HEIGHT - GRID_LINE_FULL_THICKNESS) / 8

const calculateX = (col: number) => col * SQUARE_WIDTH + GRID_LINE_HALF_THICKNESS
const calculateY = (row: number) => row * SQUARE_HEIGHT + GRID_LINE_HALF_THICKNESS

const calculatePoint = (coords: Coords): Point => ({
  x: calculateX(coords.col),
  y: calculateY(coords.row)
})

export const Drawing: React.FC<DrawingProps<{}, InternalRow, DrawingOptions>> = ({
  solutionInternalRows,
  drawingOptions
}) => {

  const drawGridLines = (): JSX.Element => {
    return (
      <g opacity={0.2}>
        {drawHorizontalGridLines()}
        {drawVerticalGridLines()}
      </g>
    )
  }

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

  const drawGridSquareBackgrounds = (): JSX.Element[] => {
    const factor = 0.1
    return range(8).flatMap(row =>
      range(8).map(col => {
        const colour = (row + col) % 2 === 0 ? BLACK_SQUARE_BACKGROUND_COLOUR : WHITE_SQUARE_BACKGROUND_COLOUR
        const x = calculateX(col) + SQUARE_WIDTH * factor
        const y = calculateY(row) + SQUARE_HEIGHT * factor
        const width = SQUARE_WIDTH - SQUARE_WIDTH * factor * 2
        const height = SQUARE_HEIGHT - SQUARE_WIDTH * factor * 2
        return (
          <rect
            key={`square-background-${row}-${col}`}
            x={x}
            y={y}
            width={width}
            height={height}
            fill={colour}
          />
        )
      }))
  }

  const drawPieces = (): JSX.Element[] => {
    return solutionInternalRows.flatMap(drawPiece)
  }

  const drawPiece = (internalRow: InternalRow): JSX.Element[] => {
    const { label, variation, location } = internalRow
    const squaresAndLabels = variation.squares.flatMap(square => {
      const { coords } = square
      const actualRow = location.row + coords.row
      const actualCol = location.col + coords.col
      const actualCoords = { row: actualRow, col: actualCol }
      const colour = square.colour === Colour.Black ? SQUARE_COLOUR_BLACK : SQUARE_COLOUR_WHITE
      const inverseColour = square.colour === Colour.Black ? SQUARE_COLOUR_WHITE : SQUARE_COLOUR_BLACK
      return [
        drawSquare(actualCoords, colour),
        ...drawLabel(actualCoords, inverseColour, label)
      ]
    })
    return [...squaresAndLabels, drawPieceBorder(internalRow)]
  }

  const drawSquare = (coords: Coords, colour: string): JSX.Element => {
    const { row, col } = coords
    const x = calculateX(col)
    const y = calculateY(row)

    return (
      <rect
        key={`piece-square-rect-${row}-${col}`}
        x={x}
        y={y}
        width={SQUARE_WIDTH}
        height={SQUARE_HEIGHT}
        fill={colour}
      />
    )
  }

  const drawPieceBorder = (internalRow: InternalRow): JSX.Element => {
    const { label, variation, location } = internalRow
    const coords = variation.squares.map(({ coords }) => coords)
    const outsideEdges = gatherOutsideEdges(coords, location)
    const borderLocations = outsideEdgesToBorderLocations(outsideEdges)
    const d = createBorderPathData(borderLocations)

    return (
      <path
        key={`piece-border-${label}`}
        d={d}
        stroke={PIECE_BORDER_COLOUR}
        strokeWidth={SQUARE_WIDTH * 0.1}
        fill="none"
      />
    )
  }

  const createBorderPathData = (coords: Coords[]): string => {
    const points = coords.map(calculatePoint)
    const pathCommands = new PathCommands()
    pathCommands.setPoints(points)
    return pathCommands.toPathData()
  }

  const drawLabel = (coords: Coords, colour: string, label: string): JSX.Element[] => {

    if (!drawingOptions.showLabels) return []

    const { row, col } = coords
    const cx = calculateX(col) + SQUARE_WIDTH / 2
    const cy = calculateY(row) + SQUARE_WIDTH / 2

    const text =
      <text
        key={`piece-square-label-${row}-${col}`}
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
      {drawGridLines()}
      {drawGridSquareBackgrounds()}
      {drawPieces()}
    </svg>
  )
}
