import { Coords, DrawingProps } from "types"
import { range } from "utils"
import { gatherOutsideEdges, outsideEdgesToBorderLocations } from "drawing-utils"
import { InternalRow } from "./internal-row"
import { Puzzle } from "./puzzle"
import { Room } from "./room"

const VIEWBOX_WIDTH = 100
const VIEWBOX_HEIGHT = 100

const GRID_LINE_FULL_THICKNESS = 1 / 4
const ROOM_BORDER_FULL_THICKNESS = GRID_LINE_FULL_THICKNESS * 4
const ROOM_BORDER_HALF_THICKNESS = ROOM_BORDER_FULL_THICKNESS / 2

const BACKGROUND_COLOUR = "white"
const GRID_LINE_COLOUR = "black"
const ROOM_BORDER_COLOUR = "black"
const INITIAL_VALUE_COLOUR = "magenta"
const CALCULATED_VALUE_COLOUR = "black"

const VALUE_FONT_SIZE = 8

export const Drawing: React.FC<DrawingProps<Puzzle, InternalRow>> = ({
  puzzle,
  solutionInternalRows
}) => {
  const SQUARE_WIDTH = (VIEWBOX_WIDTH - ROOM_BORDER_FULL_THICKNESS) / puzzle.size
  const SQUARE_HEIGHT = (VIEWBOX_HEIGHT - ROOM_BORDER_FULL_THICKNESS) / puzzle.size

  const calculateX = (col: number) => col * SQUARE_WIDTH + ROOM_BORDER_HALF_THICKNESS
  const calculateY = (row: number) => row * SQUARE_HEIGHT + ROOM_BORDER_HALF_THICKNESS

  const drawBackground = (): JSX.Element => {
    return (
      <rect
        x={0}
        y={0}
        width={VIEWBOX_WIDTH}
        height={VIEWBOX_HEIGHT}
        fill={BACKGROUND_COLOUR}
      />
    )
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

  const drawRooms = (): JSX.Element[] => {
    return puzzle.rooms.map(drawRoom)
  }

  const makePathData = (points: number[][]): string => {
    const [firstPoint, ...remainingPoints] = points
    const pathCommands: string[] = []
    pathCommands.push(`M${firstPoint[0]},${firstPoint[1]}`)
    for (const point of remainingPoints) {
      pathCommands.push(`L${point[0]},${point[1]}`)
    }
    pathCommands.push("Z")
    return pathCommands.join(" ")
  }

  const drawRoom = (room: Room): JSX.Element => {
    const outsideEdges = gatherOutsideEdges(room.cells)
    const borderLocations = outsideEdgesToBorderLocations(outsideEdges)

    const points: number[][] = []
    for (const { row, col } of borderLocations) {
      const x = calculateX(col)
      const y = calculateY(row)
      points.push([x, y])
    }

    return (
      <path
        key={`room-${room.startIndex}`}
        d={makePathData(points)}
        stroke={ROOM_BORDER_COLOUR}
        strokeWidth={ROOM_BORDER_FULL_THICKNESS}
        fill="none"
      />
    )
  }

  const drawInitiaValues = (): JSX.Element[] => {
    return puzzle.initialValues.map(initialValue =>
      drawValue(
        initialValue.cell,
        initialValue.value,
        true))
  }

  const drawCalculatedValues = (): JSX.Element[] => {
    return solutionInternalRows
      .filter(internalRow => !internalRow.isInitialValue)
      .map(internalRow =>
        drawValue(
          internalRow.cell,
          internalRow.value,
          false))
  }

  const drawValue = (cell: Coords, value: number, isInitialValue: boolean): JSX.Element => {
    const { row, col } = cell
    const cx = calculateX(col) + SQUARE_WIDTH / 2
    const cy = calculateY(row) + SQUARE_WIDTH / 2
    const fill = isInitialValue ? INITIAL_VALUE_COLOUR : CALCULATED_VALUE_COLOUR

    return (
      <text
        key={`value-${row}-${col}`}
        x={cx}
        y={cy}
        fill={fill}
        fontSize={VALUE_FONT_SIZE}
        textAnchor="middle"
        dominantBaseline="central"
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
      {drawRooms()}
      {drawInitiaValues()}
      {drawCalculatedValues()}
    </svg>
  )
}
