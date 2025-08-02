/* eslint-disable @typescript-eslint/no-unused-vars */

import { DrawingProps } from "types";
import { InternalRow } from "./internal-row";
import { Puzzle } from "./puzzle";

const VIEWBOX_WIDTH = 100;
const VIEWBOX_HEIGHT = 100;

const TAN_30 = Math.tan(Math.PI / 6); // 30°

const PIECE_HEIGHT = VIEWBOX_HEIGHT / 5;
const PIECE_WIDTH = PIECE_HEIGHT / 2 / TAN_30;

const CELLID_TO_OFFSETS = new Map([
  [0, [-1, -2]],
  [1, [0, -2]],
  [2, [1, -2]],

  [3, [-1.5, -1]],
  [4, [-0.5, -1]],
  [5, [0.5, -1]],
  [6, [1.5, -1]],

  [7, [-2, 0]],
  [8, [-1, 0]],
  [9, [0, 0]],
  [10, [1, 0]],
  [11, [2, 0]],

  [12, [-1.5, 1]],
  [13, [-0.5, 1]],
  [14, [0.5, 1]],
  [15, [1.5, 1]],

  [16, [-1, 2]],
  [17, [0, 2]],
  [18, [1, 2]],
]);

const calculateCentreX = (cellId: number) => {
  const [dx] = CELLID_TO_OFFSETS.get(cellId) ?? [0, 0];
  return 50 + dx * PIECE_WIDTH;
};

const calculateCentreY = (cellId: number) => {
  const [, dy] = CELLID_TO_OFFSETS.get(cellId) ?? [0, 0];
  return 50 + dy * PIECE_HEIGHT * 0.75;
};

type LocalDrawingProps = DrawingProps<Puzzle, InternalRow>;

export const Drawing: React.FunctionComponent<LocalDrawingProps> = ({
  puzzle,
  solutionInternalRows,
  drawingOptions,
}: LocalDrawingProps) => {
  const drawBackground = (): JSX.Element => {
    return (
      <rect
        x={0}
        y={0}
        width={VIEWBOX_WIDTH}
        height={VIEWBOX_HEIGHT}
        fill="url(#board)"
      />
    );
  };

  // https://www.quora.com/How-can-you-find-the-coordinates-in-a-hexagon
  const calculateHexagonPoints = (
    cx: number,
    cy: number,
    r: number
  ): number[][] => {
    const triangleHeight = r / 2 / TAN_30;
    return [
      [cx, cy - r],
      [cx + triangleHeight, cy - r / 2],
      [cx + triangleHeight, cy + r / 2],
      [cx, cy + r],
      [cx - triangleHeight, cy + r / 2],
      [cx - triangleHeight, cy - r / 2],
    ];
  };

  const drawHexagon = (cellId: number): JSX.Element => {
    const cx = calculateCentreX(cellId);
    const cy = calculateCentreY(cellId);
    const points = calculateHexagonPoints(cx, cy, PIECE_HEIGHT / 2 - 0.25);

    return <path d={makePathData(points)} fill="url(#piece)" />;
  };

  const drawValue = (cellId: number, value: number): JSX.Element => {
    const cx = calculateCentreX(cellId);
    const cy = calculateCentreY(cellId);

    return (
      <text
        x={cx}
        y={cy}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={8}
        fill="black"
      >
        {value}
      </text>
    );
  };

  const drawPiece = (cellId: number, value: number): JSX.Element[] => {
    return [drawHexagon(cellId), drawValue(cellId, value)];
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

  return (
    <svg viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}>
      <defs>
        <pattern
          id="board"
          height="100%"
          width="100%"
          patternContentUnits="objectBoundingBox"
        >
          <image
            href="dlxlib-demos/images/board.jpeg"
            preserveAspectRatio="none"
            width="1"
            height="1"
          />
        </pattern>
        <pattern
          id="piece"
          height="100%"
          width="100%"
          patternContentUnits="objectBoundingBox"
          patternTransform="rotate(27)"
        >
          <image
            href="dlxlib-demos/images/piece.jpg"
            preserveAspectRatio="none"
            width="1"
            height="1"
          />
        </pattern>
      </defs>
      {drawBackground()}

      {drawPiece(0, 1)}
      {drawPiece(1, 2)}
      {drawPiece(2, 3)}

      {drawPiece(3, 4)}
      {drawPiece(4, 5)}
      {drawPiece(5, 6)}
      {drawPiece(6, 7)}

      {drawPiece(7, 8)}
      {drawPiece(8, 9)}
      {drawPiece(9, 10)}
      {drawPiece(10, 11)}
      {drawPiece(11, 12)}

      {drawPiece(12, 13)}
      {drawPiece(13, 14)}
      {drawPiece(14, 15)}
      {drawPiece(15, 16)}

      {drawPiece(16, 17)}
      {drawPiece(17, 18)}
      {drawPiece(18, 19)}
    </svg>
  );
};
