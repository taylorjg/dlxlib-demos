import { Coords, DrawingProps } from "types";
import { first, range } from "utils";
import { Clue } from "./clue";
import { DrawingOptions } from "./demo-controls";
import { InternalRow } from "./internal-row";
import { Puzzle } from "./puzzle";

const VIEWBOX_WIDTH = 100;
const VIEWBOX_HEIGHT = 100;

export const Drawing: React.FC<
  DrawingProps<Puzzle, InternalRow, DrawingOptions>
> = ({ puzzle, solutionInternalRows, drawingOptions }) => {
  const GRID_LINE_FULL_THICKNESS = 1 / 4;
  const GRID_LINE_HALF_THICKNESS = GRID_LINE_FULL_THICKNESS / 2;

  const BACKGROUND_COLOUR = "white";
  const GRID_LINE_COLOUR = "black";
  const BLOCK_COLOUR = "black";
  const LETTER_COLOUR = "black";
  const CLUE_NUMBER_COLOUR = "black";

  const LETTER_FONT_SIZE = 5;
  const CLUE_NUMBER_FONT_SIZE = 1.5;

  const SQUARE_WIDTH = (VIEWBOX_WIDTH - GRID_LINE_FULL_THICKNESS) / puzzle.size;
  const SQUARE_HEIGHT =
    (VIEWBOX_HEIGHT - GRID_LINE_FULL_THICKNESS) / puzzle.size;

  const calculateX = (col: number) =>
    col * SQUARE_WIDTH + GRID_LINE_HALF_THICKNESS;
  const calculateY = (row: number) =>
    row * SQUARE_HEIGHT + GRID_LINE_HALF_THICKNESS;

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
    const rows = range(puzzle.size + 1);
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
    const cols = range(puzzle.size + 1);
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

  const drawClueNumbers = (): JSX.Element[] => {
    if (!drawingOptions.showClueNumbers) return [];
    return puzzle.clues.map(drawClueNumber);
  };

  const drawClueNumber = (clue: Clue): JSX.Element => {
    const { clueType, clueNumber } = clue;
    const { row, col } = first(clue.coordsList);
    const cx = calculateX(col) + (SQUARE_WIDTH / 16) * 3;
    const cy = calculateY(row) + (SQUARE_HEIGHT / 16) * 3;

    return (
      <text
        key={`clue-number-${clueNumber}-${clueType}`}
        x={cx}
        y={cy}
        fill={CLUE_NUMBER_COLOUR}
        fontSize={CLUE_NUMBER_FONT_SIZE}
        textAnchor="middle"
        dominantBaseline="central"
      >
        {clueNumber}
      </text>
    );
  };

  const drawAnswers = (): JSX.Element[] => {
    return solutionInternalRows.flatMap(drawAnswer);
  };

  const drawAnswer = (internalRow: InternalRow): JSX.Element[] => {
    const indices = range(internalRow.clue.coordsList.length);
    return indices.map((index) => {
      const coords = internalRow.clue.coordsList[index];
      const letter = internalRow.candidate[index];
      return drawLetter(coords, letter, internalRow.clue);
    });
  };

  const drawLetter = (
    coords: Coords,
    letter: string,
    clue: Clue
  ): JSX.Element => {
    const { clueType, clueNumber } = clue;
    const { row, col } = coords;
    const cx = calculateX(col) + SQUARE_WIDTH / 2;
    const cy = calculateY(row) + SQUARE_HEIGHT / 2;

    return (
      <text
        key={`letter-${clueNumber}-${clueType}-${row}-${col}`}
        x={cx}
        y={cy}
        fill={LETTER_COLOUR}
        fontSize={LETTER_FONT_SIZE}
        textAnchor="middle"
        dominantBaseline="central"
      >
        {letter.toLocaleUpperCase()}
      </text>
    );
  };

  return (
    <svg viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}>
      {drawBackground()}
      {drawHorizontalGridLines()}
      {drawVerticalGridLines()}
      {drawBlocks()}
      {drawClueNumbers()}
      {drawAnswers()}
    </svg>
  );
};
