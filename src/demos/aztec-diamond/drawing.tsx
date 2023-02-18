import { Coords, DrawingProps, sameCoords } from "types"
import { first, last, range } from "utils"
import { InternalRow } from "./internal-row"
import { Puzzle } from "./puzzle"
import { allHorizontals, allVerticals } from "./locations"

const VIEWBOX_WIDTH = 100
const VIEWBOX_HEIGHT = 100

const GRID_LINE_FULL_THICKNESS = 1
const TETRASTICK_FULL_THICKNESS = GRID_LINE_FULL_THICKNESS * 1.5;
const TETRASTICK_HALF_THICKNESS = TETRASTICK_FULL_THICKNESS / 2;

const GRID_LINE_COLOUR = "#80808080"

const SQUARE_WIDTH = (VIEWBOX_WIDTH - TETRASTICK_FULL_THICKNESS) / 9
const SQUARE_HEIGHT = (VIEWBOX_HEIGHT - TETRASTICK_FULL_THICKNESS) / 9

const calculateX = (col: number) => col * SQUARE_WIDTH + TETRASTICK_HALF_THICKNESS
const calculateY = (row: number) => row * SQUARE_HEIGHT + TETRASTICK_HALF_THICKNESS

const calculatePoint = (location: Coords, coords: Coords) =>
  [calculateX(location.col + coords.col), calculateY(location.row + coords.row)]

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
    return allHorizontals.map(coords => {
      const { row, col } = coords
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
  }

  const drawVerticalGridLines = (): JSX.Element[] => {
    return allVerticals.map(coords => {
      const { row, col } = coords
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
  }

  const drawTetraSticks = (): JSX.Element[] => {
    return solutionInternalRows.flatMap(drawTetraStick)
  }

  const LINE_END_MULTIPLIER = 3
  const ROUNDED_CORNER_MULTIPLIER = 4

  const insetPoint = (multiplier: number) => (coords1: Coords, coords2: Coords, point: number[]): number[] => {
    const rowDiff = coords2.row - coords1.row
    const colDiff = coords2.col - coords1.col
    const verticalInset = TETRASTICK_HALF_THICKNESS * multiplier
    const horizontalInset = TETRASTICK_HALF_THICKNESS * multiplier
    const [x, y] = point
    if (rowDiff === 1 && colDiff === 0) return [x, y + verticalInset]
    if (rowDiff === -1 && colDiff === 0) return [x, y - verticalInset]
    if (rowDiff === 0 && colDiff === 1) return [x + horizontalInset, y]
    if (rowDiff === 0 && colDiff === -1) return [x - horizontalInset, y]
    return point
  }

  const insetLineStart = insetPoint(LINE_END_MULTIPLIER)
  const insetLineEnd = insetPoint(LINE_END_MULTIPLIER)
  const insetRoundedCornerStart = insetPoint(ROUNDED_CORNER_MULTIPLIER)
  const insetRoundedCornerEnd = insetPoint(ROUNDED_CORNER_MULTIPLIER)

  // https://stackoverflow.com/a/40444735
  // const angle = ([a,b],[c,d],[e,f]) => (Math.atan2(f-d,e-c)-Math.atan2(b-d,a-c)+3*pi)%(2*pi)-pi;
  // const sweepFl = (S,V,E) => angle(E,S,V) > 0 ? 0 : 1;
  const angle = (S: Coords, V: Coords, E: Coords) => {
    const { row: b, col: a } = E
    const { row: d, col: c } = S
    const { row: f, col: e } = V
    return (Math.atan2(f - d, e - c) - Math.atan2(b - d, a - c) + 3 * Math.PI) % (2 * Math.PI) - Math.PI
  }

  const moveTo = (point: number[]): string => {
    const [x, y] = point
    return `M${x},${y}`
  }

  const lineTo = (point: number[]): string => {
    const [x, y] = point
    return `L${x},${y}`
  }

  const roundedCornerTo = (S: Coords, V: Coords, E: Coords, point: number[]): string => {
    const r = TETRASTICK_HALF_THICKNESS * ROUNDED_CORNER_MULTIPLIER
    const largeArcFlag = 0
    const sweepFlag = angle(S, V, E) < 0 ? 1 : 0
    const [x, y] = point
    return `A${r},${r},0,${largeArcFlag},${sweepFlag},${x},${y}`
  }

  const drawTetraStick = (internalRow: InternalRow): JSX.Element[] => {

    const { label, variation, location } = internalRow
    const colour = tetraStickColours.get(label)

    const pathData: string[] = []

    for (const polyLine of variation.polyLines) {
      const isClosed = sameCoords(first(polyLine), last(polyLine))
      const pathCommands: string[] = []

      if (isClosed) {
        const roundedCornerStart = insetRoundedCornerStart(polyLine[0], polyLine[1], calculatePoint(location, polyLine[0]))
        pathCommands.push(moveTo(roundedCornerStart))
      } else {
        var lineStart = insetLineStart(polyLine[0], polyLine[1], calculatePoint(location, polyLine[0]))
        pathCommands.push(moveTo(lineStart))
      }

      const indices = range(polyLine.length).slice(1).slice(0, -1)
      for (const index of indices) {
        const coords = polyLine[index]
        const coordsPrev = polyLine[index - 1]
        const coordsNext = polyLine[index + 1]
        const point = calculatePoint(location, coords)

        if (coordsPrev.row === coordsNext.row || coordsPrev.col === coordsNext.col) {
          pathCommands.push(lineTo(point))
        } else {
          const roundedCornerStart = insetRoundedCornerStart(coords, coordsPrev, point)
          pathCommands.push(lineTo(roundedCornerStart))

          const roundedCornerEnd = insetRoundedCornerEnd(coords, coordsNext, point)
          pathCommands.push(roundedCornerTo(coordsPrev, coords, coordsNext, roundedCornerEnd))
        }
      }

      if (isClosed) {
        const coords = polyLine[0]
        const coordsPrev = polyLine.slice(-2)[0] // not -1 because -1 is the same coords as point 0
        const coordsNext = polyLine[1]
        const point = calculatePoint(location, coords)

        const roundedCornerStart = insetRoundedCornerStart(coords, coordsPrev, point)
        pathCommands.push(lineTo(roundedCornerStart))

        const firstPoint = insetRoundedCornerStart(polyLine[0], polyLine[1], calculatePoint(location, coords))
        pathCommands.push(roundedCornerTo(coordsPrev, coords, coordsNext, firstPoint))
      } else {
        const lineEnd = insetLineEnd(polyLine.slice(-1)[0], polyLine.slice(-2)[0], calculatePoint(location, polyLine.slice(-1)[0]))
        pathCommands.push(lineTo(lineEnd))
      }

      pathData.push(pathCommands.join(" "))
    }

    const elements: JSX.Element[] = []

    pathData.forEach((d, index) => {
      const path = (
        <path
          key={`tetrastick-${label}-${variation.orientation}-${variation.reflected}-${index}`}
          d={d}
          stroke={colour}
          strokeWidth={TETRASTICK_FULL_THICKNESS}
          strokeLinecap="round"
          fill="none"
        />
      )
      elements.push(path)
    })

    return elements
  }

  return (
    <svg viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}>
      {drawHorizontalGridLines()}
      {drawVerticalGridLines()}
      {drawTetraSticks()}
    </svg>
  )
}
