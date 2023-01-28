import { range } from "utils"

const SIZE = 8
const VIEWBOX_WIDTH = 100
const VIEWBOX_HEIGHT = 100
const SQUARE_WIDTH = VIEWBOX_WIDTH / SIZE
const SQUARE_HEIGHT = VIEWBOX_HEIGHT / SIZE
const SQUARE_COLOUR_1 = "peru"
const SQUARE_COLOUR_2 = "sandybrown"

const calculateX = (col: number) => col * SQUARE_WIDTH
const calculateY = (row: number) => row * SQUARE_HEIGHT

export const NQueensDrawing = () => {
  const renderGrid = () => {
    const allLocations = range(SIZE).flatMap(row =>
      range(SIZE).map(col =>
        ({ row, col })))

    return allLocations.map(({ row, col }) => {
      const x = calculateX(col)
      const y = calculateY(row)
      const fill = (row + col) % 2 === 0 ? SQUARE_COLOUR_1 : SQUARE_COLOUR_2
      return <rect x={x} y={y} width={SQUARE_WIDTH} height={SQUARE_HEIGHT} fill={fill} />
    })
  }

  return (
    <svg viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}>
      <rect x={0} y={0} width={VIEWBOX_WIDTH} height={VIEWBOX_HEIGHT} fill="white" />
      {renderGrid()}
    </svg>
  )
}
