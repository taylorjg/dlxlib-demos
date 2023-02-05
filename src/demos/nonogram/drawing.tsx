import { Coords, DrawingProps } from "types"
import { range, max } from "utils"
import { DrawingOptions } from "./demo-controls"
import { InternalRow } from "./internal-row"
import { Puzzle } from "./puzzle"
import { RunGroupType } from "./run-group-type"

const VIEWBOX_WIDTH = 100
const VIEWBOX_HEIGHT = 100

export const Drawing: React.FC<DrawingProps<Puzzle, InternalRow, DrawingOptions>> = ({
  puzzle,
  solutionInternalRows,
  drawingOptions
}) => {
  const GRID_LINE_FULL_THICKNESS = 1 / 4
  const GRID_LINE_HALF_THICKNESS = GRID_LINE_FULL_THICKNESS / 2
  const GRID_LINE_COLOUR = "black"

  let numMarginSquares = 0

  if (drawingOptions.showClues) {
    const maxNumRunGroupsHorizontally = max(puzzle.horizontalRunGroups.map(rg => rg.lengths.length))
    const maxNumRunGroupsVertically = max(puzzle.verticalRunGroups.map(rg => rg.lengths.length))
    numMarginSquares = Math.max(maxNumRunGroupsHorizontally, maxNumRunGroupsVertically)
  }

  const sizeWithMargin = numMarginSquares + puzzle.size
  const SQUARE_WIDTH = (VIEWBOX_WIDTH - GRID_LINE_FULL_THICKNESS) / sizeWithMargin
  const SQUARE_HEIGHT = (VIEWBOX_HEIGHT - GRID_LINE_FULL_THICKNESS) / sizeWithMargin

  const calculateX = (col: number) => (numMarginSquares + col) * SQUARE_WIDTH + GRID_LINE_HALF_THICKNESS
  const calculateY = (row: number) => (numMarginSquares + row) * SQUARE_HEIGHT + GRID_LINE_HALF_THICKNESS

  const drawBackground = (): JSX.Element => {
    return <rect x={0} y={0} width={VIEWBOX_WIDTH} height={VIEWBOX_HEIGHT} fill="white" />
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

  const drawHorizontalRunLengths = (): JSX.Element[] => {
    if (drawingOptions.showClues) {
      return puzzle.horizontalRunGroups.flatMap(runGroup => {
        const row = runGroup.row
        const numRunLengths = runGroup.lengths.length
        return range(numRunLengths).map(index => {
          const runLength = runGroup.lengths[index]
          const col = -(numRunLengths - index)
          const coords = { row, col }
          return drawRunLength(coords, runLength)
        })
      })
    }
    return []
  }

  const drawVerticalRunLengths = (): JSX.Element[] => {
    if (drawingOptions.showClues) {
      return puzzle.verticalRunGroups.flatMap(runGroup => {
        const col = runGroup.col
        const numRunLengths = runGroup.lengths.length
        return range(numRunLengths).map(index => {
          const runLength = runGroup.lengths[index]
          const row = -(numRunLengths - index)
          const coords = { row, col }
          return drawRunLength(coords, runLength)
        })
      })
    }
    return []
  }

  const drawRunLength = (coords: Coords, runLength: number): JSX.Element => {
    const { row, col } = coords
    const cx = calculateX(col) + SQUARE_WIDTH / 2
    const cy = calculateY(row) + SQUARE_HEIGHT / 2

    return (
      <text
        key={`run-length-${row}-${col}`}
        x={cx}
        y={cy}
        fill="black"
        fontSize={5}
        textAnchor="middle"
        dominantBaseline="central"
      >
        {runLength}
      </text>
    )
  }

  const drawHorizontalRunGroups = (): JSX.Element[] => {
    return solutionInternalRows
      .filter(internalRow => internalRow.runGroup.runGroupType === RunGroupType.Horizontal)
      .flatMap(drawHorizontalRunGroup)
  }

  const drawHorizontalRunGroup = (internalRow: InternalRow): JSX.Element[] => {
    return internalRow.coordsLists.flatMap(drawHorizontalRun)
  }

  const drawHorizontalRun = (coordsList: Coords[]): JSX.Element[] => {
    return coordsList.map(drawBlock)
  }

  const drawBlock = (coords: Coords): JSX.Element => {
    const { row, col } = coords

    return (
      <rect
        key={`block-${row}-${col}`}
        x={calculateX(col)}
        y={calculateY(row)}
        width={SQUARE_WIDTH}
        height={SQUARE_HEIGHT}
        fill="black"
      />
    )
  }

  return (
    <svg viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}>
      {drawBackground()}
      {drawHorizontalGridLines()}
      {drawVerticalGridLines()}
      {drawHorizontalRunLengths()}
      {drawVerticalRunLengths()}
      {drawHorizontalRunGroups()}
    </svg>
  )
}