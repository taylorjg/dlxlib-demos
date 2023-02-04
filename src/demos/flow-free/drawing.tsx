import { Coords, DrawingProps } from "types"
import { range } from "utils"
import { InternalRow } from "./internal-row"
import { Puzzle } from "./puzzle"

const VIEWBOX_WIDTH = 100
const VIEWBOX_HEIGHT = 100

const dotColours = new Map<string, string>([
  ["A", "red"],
  ["B", "green"],
  ["C", "blue"],
  ["D", "yellow"],
  ["E", "orange"],
  ["F", "cyan"],
  ["G", "magenta"],
  ["H", "brown"],
  ["I", "purple"],
  ["J", "white"],
  ["K", "grey"],
  ["L", "limegreen"]
])

const labelColours = new Map<string, string>([
  ["A", "white"],
  ["B", "white"],
  ["C", "white"],
  ["D", "black"],
  ["E", "black"],
  ["F", "black"],
  ["G", "white"],
  ["H", "white"],
  ["I", "white"],
  ["J", "black"],
  ["K", "black"],
  ["L", "black"]
])

export const Drawing: React.FC<DrawingProps<Puzzle, InternalRow>> = ({ puzzle, solutionInternalRows }) => {

  const GRID_LINE_FULL_THICKNESS = 1 / 4
  const GRID_LINE_HALF_THICKNESS = GRID_LINE_FULL_THICKNESS / 2
  const GRID_LINE_COLOUR = "yellow"
  const SQUARE_WIDTH = (VIEWBOX_WIDTH - GRID_LINE_FULL_THICKNESS) / puzzle.size
  const SQUARE_HEIGHT = (VIEWBOX_HEIGHT - GRID_LINE_FULL_THICKNESS) / puzzle.size

  const calculateX = (col: number) => col * SQUARE_WIDTH + GRID_LINE_HALF_THICKNESS
  const calculateY = (row: number) => row * SQUARE_HEIGHT + GRID_LINE_HALF_THICKNESS

  const drawBackground = (): JSX.Element => {
    return <rect x={0} y={0} width={VIEWBOX_WIDTH} height={VIEWBOX_HEIGHT} fill="black" />
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

  const drawColourPairDots = (): JSX.Element[] => {
    return puzzle.colourPairs.flatMap(colourPair => [
      drawDot(colourPair.label, colourPair.start),
      drawDot(colourPair.label, colourPair.end),
    ])
  }

  const drawDot = (label: string, coords: Coords): JSX.Element => {
    const { row, col } = coords
    const cx = calculateX(col) + SQUARE_WIDTH / 2
    const cy = calculateY(row) + SQUARE_HEIGHT / 2
    const r = SQUARE_WIDTH * 0.35
    const fill = dotColours.get(label) ?? "white"

    return (
      <circle
        key={`dot-${row}-${col}`}
        cx={cx}
        cy={cy}
        r={r}
        fill={fill}
      />
    )
  }

  const drawColourPairLabels = (): JSX.Element[] => {
    return puzzle.colourPairs.flatMap(colourPair => [
      drawLabel(colourPair.label, colourPair.start),
      drawLabel(colourPair.label, colourPair.end)
    ])
  }

  const drawLabel = (label: string, coords: Coords): JSX.Element => {
    const { row, col } = coords
    const cx = calculateX(col) + SQUARE_WIDTH / 2
    const cy = calculateY(row) + SQUARE_WIDTH / 2
    const fill = labelColours.get(label) ?? "white"
    const fontSize = "8px"

    return (
      <text
        key={`label-${row}-${col}`}
        x={cx}
        y={cy}
        fill={fill}
        fontSize={fontSize}
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {label}
      </text>
    )
  }

  const drawPipes = (): JSX.Element[] => {
    return solutionInternalRows.map(internalRow => {
      return drawPipe(internalRow)
    })
  }

  const makePathData = (points: number[][]): string => {
    const [firstPoint, ...remainingPoints] = points
    const pathCommands: string[] = []
    pathCommands.push(`M${firstPoint[0]},${firstPoint[1]}`)
    for (const point of remainingPoints) {
      pathCommands.push(`L${point[0]},${point[1]}`)
    }
    return pathCommands.join(" ")
  }

  const drawPipe = (internalRow: InternalRow): JSX.Element => {

    const coordsToCentreOfSquare = (coords: Coords): number[] => {
      const x = calculateX(coords.col) + SQUARE_WIDTH / 2
      const y = calculateY(coords.row) + SQUARE_HEIGHT / 2
      return [x, y]
    }

    const d = makePathData(internalRow.coordsList.map(coordsToCentreOfSquare))
    const label = internalRow.colourPair.label
    const colour = dotColours.get(label) ?? "white"

    return (
      <path
        key={`path-${label}`}
        d={d}
        stroke={colour}
        strokeWidth={5}
        strokeLinejoin="round"
        fill="none"
      />
    )
  }

  return (
    <svg viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}>
      {drawBackground()}
      {drawHorizontalGridLines()}
      {drawVerticalGridLines()}
      {drawColourPairDots()}
      {drawPipes()}
      {drawColourPairLabels()}
    </svg>
  )
}
