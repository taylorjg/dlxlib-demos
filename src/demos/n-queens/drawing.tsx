import { Coords, DrawingProps } from "types"
import { range } from "utils"
import { InternalRow } from "./internal-row"
import { Puzzle } from "./puzzle"

const VIEWBOX_WIDTH = 100
const VIEWBOX_HEIGHT = 100
const SQUARE_COLOUR_1 = "peru"
const SQUARE_COLOUR_2 = "sandybrown"

export const Drawing: React.FC<DrawingProps<Puzzle, InternalRow>> = ({ puzzle, solutionInternalRows }) => {
  const { size } = puzzle

  const calculateX = (col: number) => col * VIEWBOX_WIDTH / size
  const calculateY = (row: number) => row * VIEWBOX_HEIGHT / size

  const drawBackground = (): JSX.Element => {
    return <rect x={0} y={0} width={VIEWBOX_WIDTH} height={VIEWBOX_HEIGHT} fill="white" />
  }

  const drawGrid = (): JSX.Element[] => {
    const allLocations = range(size).flatMap(row =>
      range(size).map(col =>
        ({ row, col })))

    return allLocations.map(({ row, col }) => {
      const x = calculateX(col)
      const y = calculateY(row)
      const fill = (row + col) % 2 === 0 ? SQUARE_COLOUR_1 : SQUARE_COLOUR_2
      return <rect
        key={`square-${row}-${col}`}
        x={x}
        y={y}
        width={VIEWBOX_WIDTH / size}
        height={VIEWBOX_HEIGHT / size}
        fill={fill}
      />
    })
  }

  const drawQueens = (): JSX.Element[] => {
    return solutionInternalRows.map(internalRow => drawQueen(internalRow.coords))
  }

  const drawQueen = (coords: Coords): JSX.Element => {
    const { row, col } = coords
    const cx = calculateX(col) + VIEWBOX_WIDTH / size / 2
    const cy = calculateY(row) + VIEWBOX_HEIGHT / size / 2

    // Unicode white chess queen
    // https://util.unicode.org/UnicodeJsps/character.jsp?a=2655
    const text = "\u2655"

    return (
      <text
        key={`queen-${row}-${col}`}
        x={cx}
        y={cy}
        fill="white"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {text}
      </text>
    )
  }

  return (
    <svg viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}>
      {drawBackground()}
      {drawGrid()}
      {drawQueens()}
    </svg>
  )
}
