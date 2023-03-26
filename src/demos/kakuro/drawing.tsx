import { Coords, DrawingProps } from "types";
import { range } from "utils";
import { DrawingOptions } from "./demo-controls";
import { InternalRow } from "./internal-row";
import { Clue } from "./clue";
import { Puzzle } from "./puzzle";
import { RunType } from "./run-type";

const VIEWBOX_WIDTH = 100;
const VIEWBOX_HEIGHT = 100;

const GRID_LINE_FULL_THICKNESS = 1 / 4;
const GRID_LINE_HALF_THICKNESS = GRID_LINE_FULL_THICKNESS / 2;

const BACKGROUND_COLOUR = "white";
const GRID_LINE_COLOUR = "black";
const BLOCK_COLOUR = "black";
const CLUE_ARROW_COLOUR = "white";
const CLUE_SUM_COLOUR = "black";
const VALUE_COLOUR = "black";

const CLUE_SUM_FONT_SIZE = 3;
const VALUE_FONT_SIZE = 6;

const SQUARE_WIDTH = (VIEWBOX_WIDTH - GRID_LINE_FULL_THICKNESS) / 10;
const SQUARE_HEIGHT = (VIEWBOX_HEIGHT - GRID_LINE_FULL_THICKNESS) / 10;

const calculateX = (col: number) =>
  col * SQUARE_WIDTH + GRID_LINE_HALF_THICKNESS;
const calculateY = (row: number) =>
  row * SQUARE_HEIGHT + GRID_LINE_HALF_THICKNESS;

export const Drawing: React.FC<
  DrawingProps<Puzzle, InternalRow, DrawingOptions>
> = ({ puzzle, solutionInternalRows, drawingOptions }) => {
  const drawBackground = (): JSX.Element => {
    return (
      <rect
        x={0}
        y={0}
        width={VIEWBOX_WIDTH}
        height={VIEWBOX_HEIGHT}
        fill={BACKGROUND_COLOUR}
      />
    );
  };

  const drawHorizontalGridLines = (): JSX.Element[] => {
    const rows = range(10 + 1);
    return rows.map((row) => {
      const y = calculateY(row);
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
      );
    });
  };

  const drawVerticalGridLines = (): JSX.Element[] => {
    const cols = range(10 + 1);
    return cols.map((col) => {
      const x = calculateX(col);
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
      );
    });
  };

  const drawBlocks = (): JSX.Element[] => {
    return puzzle.blocks.map(drawBlock);
  };

  const drawBlock = (block: Coords): JSX.Element => {
    const { row, col } = block;
    const x = calculateX(col);
    const y = calculateY(row);
    return (
      <rect
        key={`block-${row}-${col}`}
        x={x}
        y={y}
        width={SQUARE_WIDTH}
        height={SQUARE_HEIGHT}
        fill={BLOCK_COLOUR}
      />
    );
  };

  const drawClues = (): JSX.Element[] => {
    if (!drawingOptions.showClues) return [];
    return puzzle.clues.flatMap((clue) => drawClue(clue));
  };

  const drawClue = (clue: Clue): JSX.Element[] => {
    const acrossElements =
      clue.acrossSum !== undefined
        ? drawAcrossClue(clue.coords, clue.acrossSum)
        : [];
    const downElements =
      clue.downSum !== undefined ? drawDownClue(clue.coords, clue.downSum) : [];
    return acrossElements.concat(downElements);
  };

  const makePathData = (points: number[][]): string => {
    const [firstPoint, ...remainingPoints] = points;
    const pathCommands: string[] = [];
    pathCommands.push(`M${firstPoint[0]},${firstPoint[1]}`);
    for (const point of remainingPoints) {
      pathCommands.push(`L${point[0]},${point[1]}`);
    }
    pathCommands.push("Z");
    return pathCommands.join(" ");
  };

  const drawAcrossClue = (coords: Coords, sum: number): JSX.Element[] => {
    const { row, col } = coords;

    const px = calculateX(col);
    const py = calculateY(row);
    const p1 = [px + GRID_LINE_FULL_THICKNESS, py];
    const p2 = [px + SQUARE_WIDTH * 0.85, py];
    const p3 = [px + SQUARE_WIDTH, py + SQUARE_HEIGHT / 4];
    const p4 = [p2[0], py + SQUARE_HEIGHT / 2];
    const p5 = [
      px + SQUARE_WIDTH / 2 + GRID_LINE_FULL_THICKNESS,
      py + SQUARE_HEIGHT / 2,
    ];
    const path = (
      <path
        key={`across-arrow-${row}-${col}`}
        d={makePathData([p1, p2, p3, p4, p5])}
        fill={CLUE_ARROW_COLOUR}
      />
    );

    const x = calculateX(col) + SQUARE_WIDTH * 0.75;
    const y = calculateY(row) + SQUARE_HEIGHT * 0.25;
    const text = (
      <text
        key={`across-sum-${row}-${col}`}
        x={x}
        y={y}
        fill={CLUE_SUM_COLOUR}
        fontSize={CLUE_SUM_FONT_SIZE}
        textAnchor="middle"
        dominantBaseline="central"
      >
        {sum}
      </text>
    );

    return [path, text];
  };

  const drawDownClue = (coords: Coords, sum: number): JSX.Element[] => {
    const { row, col } = coords;

    const px = calculateX(col);
    const py = calculateY(row);
    const p1 = [px, py + GRID_LINE_FULL_THICKNESS];
    const p2 = [px, py + SQUARE_HEIGHT * 0.85];
    const p3 = [px + SQUARE_WIDTH / 4, py + SQUARE_HEIGHT];
    const p4 = [px + SQUARE_WIDTH / 2, p2[1]];
    const p5 = [
      px + SQUARE_WIDTH / 2,
      py + SQUARE_HEIGHT / 2 + GRID_LINE_FULL_THICKNESS,
    ];
    const path = (
      <path
        key={`down-arrow-${row}-${col}`}
        d={makePathData([p1, p2, p3, p4, p5])}
        fill={CLUE_ARROW_COLOUR}
      />
    );

    const x = calculateX(col) + SQUARE_WIDTH * 0.25;
    const y = calculateY(row) + SQUARE_HEIGHT * 0.75;
    const text = (
      <text
        key={`down-sum-${row}-${col}`}
        x={x}
        y={y}
        fill={CLUE_SUM_COLOUR}
        fontSize={CLUE_SUM_FONT_SIZE}
        textAnchor="middle"
        dominantBaseline="central"
      >
        {sum}
      </text>
    );

    return [path, text];
  };

  const drawHorizontalRuns = (): JSX.Element[] => {
    return solutionInternalRows
      .filter((internalRow) => internalRow.run.runType === RunType.Horizontal)
      .flatMap(drawHorizontalRun);
  };

  const drawHorizontalRun = (internalRow: InternalRow): JSX.Element[] => {
    return range(internalRow.run.coordsList.length).map((index) => {
      const coords = internalRow.run.coordsList[index];
      const value = internalRow.values[index];
      return drawValue(coords, value);
    });
  };

  const drawValue = (coords: Coords, value: number): JSX.Element => {
    const { row, col } = coords;
    const cx = calculateX(col) + SQUARE_WIDTH / 2;
    const cy = calculateY(row) + SQUARE_WIDTH / 2;

    return (
      <text
        key={`value-${row}-${col}`}
        x={cx}
        y={cy}
        fill={VALUE_COLOUR}
        fontSize={VALUE_FONT_SIZE}
        textAnchor="middle"
        dominantBaseline="central"
      >
        {value}
      </text>
    );
  };

  return (
    <svg viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}>
      {drawBackground()}
      {drawHorizontalGridLines()}
      {drawVerticalGridLines()}
      {drawBlocks()}
      {drawClues()}
      {drawHorizontalRuns()}
    </svg>
  );
};
