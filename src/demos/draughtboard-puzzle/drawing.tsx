import { Coords, DrawingProps, EmptyPuzzle, Point } from "types";
import { range } from "utils";
import {
  gatherOutsideEdges,
  outsideEdgesToBorderLocations,
  collapseLocations,
  createBorderPathData,
  inset,
} from "drawing-utils";
import { Colour } from "./colour";
import { DrawingOptions } from "./demo-controls";
import { InternalRow } from "./internal-row";
import { Square } from "./square";

const VIEWBOX_WIDTH = 100;
const VIEWBOX_HEIGHT = 100;

const GRID_LINE_FULL_THICKNESS = 0.5;
const GRID_LINE_HALF_THICKNESS = GRID_LINE_FULL_THICKNESS / 2;

const GRID_LINE_COLOUR = "#CCCCCC";
const BLACK_SQUARE_BACKGROUND_COLOUR = "#CCCCCC20";
const WHITE_SQUARE_BACKGROUND_COLOUR = "#CCCCCC60";
const SQUARE_COLOUR_BLACK = "black";
const SQUARE_COLOUR_WHITE = "white";
const PIECE_BORDER_COLOUR = "#0066CC";

const LABEL_FONT_SIZE = 3;

const SQUARE_WIDTH = (VIEWBOX_WIDTH - GRID_LINE_FULL_THICKNESS) / 8;
const SQUARE_HEIGHT = (VIEWBOX_HEIGHT - GRID_LINE_FULL_THICKNESS) / 8;

const calculateX = (col: number) =>
  col * SQUARE_WIDTH + GRID_LINE_HALF_THICKNESS;
const calculateY = (row: number) =>
  row * SQUARE_HEIGHT + GRID_LINE_HALF_THICKNESS;

const calculatePoint = (coords: Coords): Point => ({
  x: calculateX(coords.col),
  y: calculateY(coords.row),
});

type LocalDrawingProps = DrawingProps<EmptyPuzzle, InternalRow, DrawingOptions>;

export const Drawing: React.FunctionComponent<LocalDrawingProps> = ({
  solutionInternalRows,
  drawingOptions,
}: LocalDrawingProps) => {
  const drawGridLines = (): JSX.Element => {
    return (
      <g opacity={0.1}>
        {drawHorizontalGridLines()}
        {drawVerticalGridLines()}
      </g>
    );
  };

  const drawHorizontalGridLines = (): JSX.Element[] => {
    const rows = range(9);
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
    const cols = range(9);
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

  const drawGridSquareBackgrounds = (): JSX.Element[] => {
    const factor = 0.1;
    return range(8).flatMap((row) =>
      range(8).map((col) => {
        const colour =
          (row + col) % 2 === 0
            ? BLACK_SQUARE_BACKGROUND_COLOUR
            : WHITE_SQUARE_BACKGROUND_COLOUR;
        const { x, y, width, height } = inset(
          calculateX(col),
          calculateY(row),
          SQUARE_WIDTH,
          SQUARE_HEIGHT,
          factor
        );
        return (
          <rect
            key={`square-background-${row}-${col}`}
            x={x}
            y={y}
            width={width}
            height={height}
            fill={colour}
          />
        );
      })
    );
  };

  const drawPieces = (): JSX.Element[] => {
    return solutionInternalRows.flatMap(drawPiece);
  };

  const drawPiece = (internalRow: InternalRow): JSX.Element[] => {
    const { label, variation, location } = internalRow;

    const coords = variation.squares.map(({ coords }) => coords);
    const outsideEdges = gatherOutsideEdges(coords, location);
    const borderLocations = outsideEdgesToBorderLocations(outsideEdges);
    const collapsedBorderLocations = collapseLocations(borderLocations);
    const borderPoints = collapsedBorderLocations.map(calculatePoint);
    const d = createBorderPathData(borderPoints, SQUARE_WIDTH * 0.1);
    const clipPathId = `piece-clip-path-${label}`;

    const clipPath = (
      <clipPath key={clipPathId} id={clipPathId}>
        <path d={d} />
      </clipPath>
    );

    const squares = (
      <g key={`piece-squares-${label}`} clipPath={`url(#${clipPathId})`}>
        {variation.squares.map((square) => drawSquare(square, location))}
      </g>
    );

    const labels = drawLabels(variation.squares, location, label);

    const border = (
      <path
        key={`piece-border-${label}`}
        d={d}
        stroke={PIECE_BORDER_COLOUR}
        strokeWidth={SQUARE_WIDTH * 0.05}
        fill="none"
      />
    );

    return [clipPath, squares, ...labels, border];
  };

  const drawSquare = (square: Square, location: Coords): JSX.Element => {
    const row = location.row + square.coords.row;
    const col = location.col + square.coords.col;
    const x = calculateX(col);
    const y = calculateY(row);
    const colour =
      square.colour === Colour.Black
        ? SQUARE_COLOUR_BLACK
        : SQUARE_COLOUR_WHITE;

    return (
      <rect
        key={`piece-square-${row}-${col}`}
        x={x}
        y={y}
        width={SQUARE_WIDTH}
        height={SQUARE_HEIGHT}
        fill={colour}
      />
    );
  };

  const drawLabels = (
    squares: Square[],
    location: Coords,
    label: string
  ): JSX.Element[] => {
    if (!drawingOptions.showLabels) return [];
    return squares.map((square) => drawLabel(square, location, label));
  };

  const drawLabel = (
    square: Square,
    location: Coords,
    label: string
  ): JSX.Element => {
    const row = location.row + square.coords.row;
    const col = location.col + square.coords.col;
    const cx = calculateX(col) + SQUARE_WIDTH / 2;
    const cy = calculateY(row) + SQUARE_WIDTH / 2;
    const inverseColour =
      square.colour === Colour.Black
        ? SQUARE_COLOUR_WHITE
        : SQUARE_COLOUR_BLACK;

    return (
      <text
        key={`piece-square-label-${row}-${col}`}
        x={cx}
        y={cy}
        fill={inverseColour}
        fontSize={LABEL_FONT_SIZE}
        textAnchor="middle"
        dominantBaseline="central"
      >
        {label}
      </text>
    );
  };

  return (
    <svg viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}>
      {drawGridLines()}
      {drawGridSquareBackgrounds()}
      {drawPieces()}
    </svg>
  );
};
