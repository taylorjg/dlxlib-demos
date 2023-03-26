import { addCoords, Coords, DrawingProps, EmptyPuzzle } from "types";
import { range } from "utils";
import {
  gatherOutsideEdges,
  outsideEdgesToBorderLocations,
  collapseLocations,
  createBorderPathData,
} from "drawing-utils";
import { DrawingOptions } from "./demo-controls";
import { InternalRow } from "./internal-row";
import { Orientation } from "./orientation";

const VIEWBOX_WIDTH = 100;
const VIEWBOX_HEIGHT = 100;

const GRID_LINE_FULL_THICKNESS = 0.5;
const GRID_LINE_HALF_THICKNESS = GRID_LINE_FULL_THICKNESS / 2;

const GRID_LINE_COLOUR = "#CCCCCC";
const FALLBACK_PIECE_COLOUR = "white";
const PIECE_BORDER_COLOUR = "black";
const LABEL_COLOUR = "white";

const LABEL_FONT_SIZE = 3;

const SQUARE_WIDTH = (VIEWBOX_WIDTH - GRID_LINE_FULL_THICKNESS) / 8;
const SQUARE_HEIGHT = (VIEWBOX_HEIGHT - GRID_LINE_FULL_THICKNESS) / 8;

const calculateX = (col: number) =>
  col * SQUARE_WIDTH + GRID_LINE_HALF_THICKNESS;
const calculateY = (row: number) =>
  row * SQUARE_HEIGHT + GRID_LINE_HALF_THICKNESS;

const calculatePoint = (coords: Coords) => ({
  x: calculateX(coords.col),
  y: calculateY(coords.row),
});

const pieceColours = new Map<string, string>([
  ["F", "#CCCCE5"],
  ["I", "#650205"],
  ["L", "#984D11"],
  ["N", "#FFFD38"],
  ["P", "#FD8023"],
  ["T", "#FC2028"],
  ["U", "#7F1CC9"],
  ["V", "#6783E3"],
  ["W", "#0F7F12"],
  ["X", "#FC1681"],
  ["Y", "#29FD2F"],
  ["Z", "#CCCA2A"],
]);

export const Drawing: React.FC<
  DrawingProps<EmptyPuzzle, InternalRow, DrawingOptions>
> = ({ solutionInternalRows, drawingOptions }) => {
  const drawGridLines = (): JSX.Element => {
    return (
      <g opacity={0.2}>
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
        <rect
          key={`horizontal-grid-line-${row}`}
          x={0}
          y={y - GRID_LINE_HALF_THICKNESS}
          width={VIEWBOX_WIDTH}
          height={GRID_LINE_FULL_THICKNESS}
          fill={GRID_LINE_COLOUR}
        />
      );
    });
  };

  const drawVerticalGridLines = (): JSX.Element[] => {
    const cols = range(9);
    return cols.map((col) => {
      const x = calculateX(col);
      return (
        <rect
          key={`vertical-grid-line-${col}`}
          x={x - GRID_LINE_HALF_THICKNESS}
          y={0}
          width={GRID_LINE_FULL_THICKNESS}
          height={VIEWBOX_HEIGHT}
          fill={GRID_LINE_COLOUR}
        />
      );
    });
  };

  const drawPieces = (): JSX.Element[] => {
    return solutionInternalRows.flatMap(drawPiece);
  };

  const drawPiece = (internalRow: InternalRow): JSX.Element[] => {
    const { label, variation, location } = internalRow;
    const colour = pieceColours.get(label) ?? FALLBACK_PIECE_COLOUR;

    const outsideEdges = gatherOutsideEdges(variation.coordsList, location);
    const borderLocations = outsideEdgesToBorderLocations(outsideEdges);
    const collapsedBorderLocations = collapseLocations(borderLocations);
    const borderPoints = collapsedBorderLocations.map(calculatePoint);
    const d = createBorderPathData(borderPoints, SQUARE_WIDTH * 0.04);

    const path = (
      <path
        key={`piece-path-${label}`}
        d={d}
        fill={colour}
        stroke={PIECE_BORDER_COLOUR}
        strokeWidth={SQUARE_WIDTH * 0.02}
        strokeLinejoin="round"
      />
    );

    const labels = drawLabels(internalRow);

    return [path, ...labels];
  };

  const drawCentreHole = (): JSX.Element[] => {
    if (solutionInternalRows.length === 0) return [];

    const fakeLabel = "";
    const fakeCoordsList = [
      { row: 0, col: 0 },
      { row: 1, col: 0 },
      { row: 1, col: 1 },
      { row: 0, col: 1 },
    ];
    const fakeVariation = {
      orientation: Orientation.North,
      reflected: false,
      coordsList: fakeCoordsList,
    };
    const fakeLocation = { row: 3, col: 3 };
    const fakeInternalRow = {
      label: fakeLabel,
      variation: fakeVariation,
      location: fakeLocation,
    };
    return drawPiece(fakeInternalRow);
  };

  const drawLabels = (internalRow: InternalRow): JSX.Element[] => {
    if (!drawingOptions.showLabels) return [];
    const { label, variation, location } = internalRow;
    return variation.coordsList.map((coords) => {
      const actualCoords = addCoords(location, coords);
      return drawLabel(actualCoords, label);
    });
  };

  const drawLabel = (coords: Coords, label: string): JSX.Element => {
    const { row, col } = coords;
    const cx = calculateX(col) + SQUARE_WIDTH / 2;
    const cy = calculateY(row) + SQUARE_WIDTH / 2;

    return (
      <text
        key={`piece-label-${row}-${col}`}
        x={cx}
        y={cy}
        fill={LABEL_COLOUR}
        filter="url(#text-shadow)"
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
      <defs>
        <filter id="text-shadow">
          <feDropShadow dx="0.2" dy="0.4" stdDeviation="0.2" />
        </filter>
      </defs>
      {drawGridLines()}
      {drawCentreHole()}
      {drawPieces()}
    </svg>
  );
};
