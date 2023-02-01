import { Coords, DrawingProps } from "types"
import { range } from "utils"
import { KakuroInternalRow } from "./internal-row"
import { Puzzle } from "./puzzle"
import { RunType } from "./run-type"

const VIEWBOX_WIDTH = 100
const VIEWBOX_HEIGHT = 100
const GRID_LINE_FULL_THICKNESS = 1 / 4
const GRID_LINE_HALF_THICKNESS = GRID_LINE_FULL_THICKNESS / 2
const GRID_LINE_COLOUR = "black"
const SQUARE_WIDTH = (VIEWBOX_WIDTH - GRID_LINE_FULL_THICKNESS) / 10
const SQUARE_HEIGHT = (VIEWBOX_HEIGHT - GRID_LINE_FULL_THICKNESS) / 10

const calculateX = (col: number) => col * SQUARE_WIDTH + GRID_LINE_HALF_THICKNESS
const calculateY = (row: number) => row * SQUARE_HEIGHT + GRID_LINE_HALF_THICKNESS

export const KakuroDrawing: React.FC<DrawingProps<Puzzle, KakuroInternalRow>> = ({ puzzle, solutionInternalRows }) => {

  const renderHorizontalGridLines = (): JSX.Element[] => {
    const rows = range(10 + 1)
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

  const renderVerticalGridLines = (): JSX.Element[] => {
    const cols = range(10 + 1)
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

  const renderBlocks = (): JSX.Element[] => {
    return puzzle.blocks.map(renderBlock)
  }

  const renderBlock = (block: Coords): JSX.Element => {
    const { row, col } = block
    const x = calculateX(col)
    const y = calculateY(row)
    return (
      <rect
        key={`block-${row}-${col}`}
        x={x}
        y={y}
        width={SQUARE_WIDTH}
        height={SQUARE_HEIGHT}
        fill="black"
      />
    )
  }

  const renderHorizontalRuns = (): JSX.Element[] => {
    return solutionInternalRows
      .filter(internalRow => internalRow.run.runType === RunType.Horizontal)
      .flatMap(renderHorizontalRun)
  }

  const renderHorizontalRun = (internalRow: KakuroInternalRow): JSX.Element[] => {
    return range(internalRow.run.coordsList.length).map(index => {
      const coords = internalRow.run.coordsList[index]
      const value = internalRow.values[index]
      return renderValue(coords, value)
    })
  }

  const renderValue = (coords: Coords, value: number): JSX.Element => {
    const { row, col } = coords
    const cx = calculateX(col) + SQUARE_WIDTH / 2
    const cy = calculateY(row) + SQUARE_WIDTH / 2
    const fill = "black"
    const fontSize = "8px"

    return (
      <text
        key={`value-${row}-${col}`}
        x={cx}
        y={cy}
        fill={fill}
        fontSize={fontSize}
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {value}
      </text>
    )
  }
  return (
    <svg viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}>
      <rect x={0} y={0} width={VIEWBOX_WIDTH} height={VIEWBOX_HEIGHT} fill="white" />
      {renderHorizontalGridLines()}
      {renderVerticalGridLines()}
      {renderBlocks()}
      {renderHorizontalRuns()}
    </svg>
  )
}
