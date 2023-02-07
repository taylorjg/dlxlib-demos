import { Coords, DrawingProps } from "types"
import { range } from "utils"
import { InternalRow } from "./internal-row"
import { Puzzle } from "./puzzle"

const VIEWBOX_WIDTH = 100
const VIEWBOX_HEIGHT = 100
const GRID_LINE_FULL_THICKNESS = 1
// const GRID_LINE_HALF_THICKNESS = GRID_LINE_FULL_THICKNESS / 2
const GRID_LINE_COLOUR = "#80808080"
const TETRASTICK_FULL_THICKNESS = GRID_LINE_FULL_THICKNESS * 2;
const TETRASTICK_HALF_THICKNESS = TETRASTICK_FULL_THICKNESS / 2;
const SQUARE_WIDTH = (VIEWBOX_WIDTH - TETRASTICK_FULL_THICKNESS) / 5
const SQUARE_HEIGHT = (VIEWBOX_HEIGHT - TETRASTICK_FULL_THICKNESS) / 5

const calculateX = (col: number) => col * SQUARE_WIDTH + TETRASTICK_HALF_THICKNESS
const calculateY = (row: number) => row * SQUARE_HEIGHT + TETRASTICK_HALF_THICKNESS

const tetraStickColours = new Map<string, string>([
  ["F", "#FF7366"],
  ["H", "#00E61A"],
  ["I", "#660066"],
  ["J", "#E6E6FF"],
  ["L", "#596673"],
  ["N", "#FFFF00"],
  ["O", "#CCCC1A"],
  ["P", "#994D33"],
  ["R", "#9926B2"],
  ["T", "#3300B2"],
  ["U", "#FF2699"],
  ["V", "#00FFFF"],
  ["W", "#CCFF00"],
  ["X", "#E60000"],
  ["Y", "#6659E6"],
  ["Z", "#008000"]
])

export const Drawing: React.FC<DrawingProps<Puzzle, InternalRow>> = ({
  solutionInternalRows,
}) => {

  const drawHorizontalGridLines = (): JSX.Element[] => {
    const rows = range(6)
    const cols = range(5)

    return rows.flatMap(row =>
      cols.map(col => {
        const x1 = calculateX(col) + TETRASTICK_FULL_THICKNESS
        const x2 = calculateX(col + 1) - TETRASTICK_FULL_THICKNESS
        const y = calculateY(row)
        return (
          <line
            key={`horizontal-grid-line-${row}-${col}`}
            x1={x1}
            y1={y}
            x2={x2}
            y2={y}
            strokeWidth={GRID_LINE_FULL_THICKNESS}
            stroke={GRID_LINE_COLOUR}
          />
        )
      })
    )
  }

  const drawVerticalGridLines = (): JSX.Element[] => {
    const rows = range(5)
    const cols = range(6)

    return rows.flatMap(row =>
      cols.map(col => {
        const x = calculateX(col)
        const y1 = calculateY(row) + TETRASTICK_FULL_THICKNESS
        const y2 = calculateY(row + 1) - TETRASTICK_FULL_THICKNESS
        return (
          <line
            key={`vertical-grid-line-${row}-${col}`}
            x1={x}
            y1={y1}
            x2={x}
            y2={y2}
            strokeWidth={GRID_LINE_FULL_THICKNESS}
            stroke={GRID_LINE_COLOUR}
          />
        )
      })
    )
  }

  // const makePathData = (points: number[][]): string => {
  //   const [firstPoint, ...remainingPoints] = points
  //   const pathCommands: string[] = []
  //   pathCommands.push(`M${firstPoint[0]},${firstPoint[1]}`)
  //   for (const point of remainingPoints) {
  //     pathCommands.push(`L${point[0]},${point[1]}`)
  //   }
  //   return pathCommands.join(" ")
  // }

  const drawTetraSticks = (): JSX.Element[] => {
    return solutionInternalRows.flatMap(drawTetraStick)
  }

  const drawTetraStick = (internalRow: InternalRow): JSX.Element[] => {
    const hs = internalRow.variation.horizontals.map(h => drawHorizontalLineSegment(internalRow, h))
    const vs = internalRow.variation.verticals.map(v => drawVerticalLineSegment(internalRow, v))
    return hs.concat(vs)
  }

  const drawHorizontalLineSegment = (internalRow: InternalRow, coords: Coords): JSX.Element => {
    const actualRow = internalRow.location.row + coords.row
    const actualCol = internalRow.location.col + coords.col
    const x1 = calculateX(actualCol)
    const x2 = calculateX(actualCol + 1)
    const y = calculateY(actualRow)
    const stroke = tetraStickColours.get(internalRow.label)

    return (
      <line
        key={`hline-${actualRow}-${actualCol}`}
        x1={x1}
        y1={y}
        x2={x2}
        y2={y}
        stroke={stroke}
        strokeWidth={TETRASTICK_FULL_THICKNESS}
      />
    )
  }

  const drawVerticalLineSegment = (internalRow: InternalRow, coords: Coords): JSX.Element => {
    const actualRow = internalRow.location.row + coords.row
    const actualCol = internalRow.location.col + coords.col
    const x = calculateX(actualCol)
    const y1 = calculateY(actualRow)
    const y2 = calculateY(actualRow + 1)
    const stroke = tetraStickColours.get(internalRow.label)

    return (
      <line
        key={`vline-${actualRow}-${actualCol}`}
        x1={x}
        y1={y1}
        x2={x}
        y2={y2}
        stroke={stroke}
        strokeWidth={TETRASTICK_FULL_THICKNESS}
      />
    )
  }

  return (
    <svg viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}>
      {drawHorizontalGridLines()}
      {drawVerticalGridLines()}
      {drawTetraSticks()}
    </svg>
  )
}
