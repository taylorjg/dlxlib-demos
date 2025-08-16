import { DrawingProps } from "types";
import { InternalRow } from "./internal-row";
import { Puzzle } from "./puzzle";
import { RunType } from "./run-type";
import { range } from "utils";

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

const getRandomPatternNum = (): number => {
  return Math.floor(Math.random() * 5) + 1;
};

const randomPatternNumMap = new Map(
  range(19)
    .map((n) => n + 1)
    .map((value) => [value, getRandomPatternNum()])
);

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
  solutionInternalRows,
}: LocalDrawingProps) => {
  const drawBackground = (): JSX.Element => {
    return (
      <rect
        x={0}
        y={0}
        width={VIEWBOX_WIDTH}
        height={VIEWBOX_HEIGHT}
        fill="url(#board2)"
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

  const drawHexagon = (
    runType: RunType,
    cellId: number,
    value: number
  ): JSX.Element => {
    const cx = calculateCentreX(cellId);
    const cy = calculateCentreY(cellId);
    const points = calculateHexagonPoints(cx, cy, PIECE_HEIGHT / 2 - 0.25);
    const randomPatternNum = randomPatternNumMap.get(value);
    const fill = `url(#piece${randomPatternNum})`;

    return (
      <path
        key={`hexagon-${runType}-${cellId}`}
        d={makePathData(points)}
        fill={fill}
        filter="url(#shadow)"
      />
    );
  };

  const drawValue = (
    runType: RunType,
    cellId: number,
    value: number
  ): JSX.Element => {
    const cx = calculateCentreX(cellId);
    const cy = calculateCentreY(cellId);

    return (
      <text
        key={`value-${runType}-${cellId}`}
        x={cx}
        y={cy}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={9}
        fill="black"
      >
        {value}
      </text>
    );
  };

  const drawPiece = (
    runType: RunType,
    cellId: number,
    value: number
  ): JSX.Element[] => {
    return [
      drawHexagon(runType, cellId, value),
      drawValue(runType, cellId, value),
    ];
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

  const drawRun = (internalRow: InternalRow): JSX.Element[] => {
    return range(internalRow.run.cellIds.length).flatMap((index) => {
      const runType = internalRow.run.runType;
      const cellId = internalRow.run.cellIds[index];
      const value = internalRow.values[index];
      return drawPiece(runType, cellId, value);
    });
  };

  const drawHorizontalRuns = (): JSX.Element[] => {
    return solutionInternalRows
      .filter((internalRow) => internalRow.run.runType === RunType.Horizontal)
      .flatMap(drawRun);
  };

  const drawDiagonal1Runs = (): JSX.Element[] => {
    return solutionInternalRows
      .filter((internalRow) => internalRow.run.runType === RunType.Diagonal1)
      .flatMap(drawRun);
  };

  const drawDiagonal2Runs = (): JSX.Element[] => {
    return solutionInternalRows
      .filter((internalRow) => internalRow.run.runType === RunType.Diagonal2)
      .flatMap(drawRun);
  };

  const drawBoardCutOut = (): JSX.Element[] => {
    return range(19).map((cellId) => {
      const cx = calculateCentreX(cellId);
      const cy = calculateCentreY(cellId);
      const points = calculateHexagonPoints(cx, cy, PIECE_HEIGHT / 2 + 0);
      return (
        <path
          key={`cutout-${cellId}`}
          d={makePathData(points)}
          fill="transparent"
          // fill="#654321"
          // fillOpacity={0.75}
          stroke="#654321"
          strokeWidth={0.2}
        />
      );
    });
  };

  const makePiecePattern = (
    id: string,
    angle: number,
    scaleX: number,
    scaleY: number
  ): JSX.Element => {
    return (
      <pattern
        id={id}
        height="100%"
        width="100%"
        patternContentUnits="objectBoundingBox"
        patternTransform={`rotate(${angle}), scale(${scaleX} ,${scaleY})`}
      >
        <image
          href="dlxlib-demos/images/piece.jpg"
          preserveAspectRatio="none"
          width="1"
          height="1"
        />
      </pattern>
    );
  };

  const makeClipPath = () => {
    return (
      <clipPath id="boardCutOut">
        {range(19).map((cellId) => {
          const cx = calculateCentreX(cellId);
          const cy = calculateCentreY(cellId);
          const points = calculateHexagonPoints(
            cx,
            cy,
            PIECE_HEIGHT / 2 + 0.25
          );
          return <path key={`clip-${cellId}`} d={makePathData(points)} />;
        })}
      </clipPath>
    );
  };

  return (
    <svg viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}>
      <defs>
        <filter id="shadow">
          <feDropShadow dx="0.2" dy="-0.2" stdDeviation="0.5" />
        </filter>{" "}
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
          id="board2"
          height="100%"
          width="100%"
          patternContentUnits="objectBoundingBox"
        >
          <image
            href="dlxlib-demos/images/board2.jpg"
            preserveAspectRatio="none"
            width="1"
            height="1"
          />
        </pattern>
        {makePiecePattern("piece1", 27, 0.85, 16.03)}
        {makePiecePattern("piece2", 43, 4.64, 9.75)}
        {makePiecePattern("piece3", -12, 3.08, 1.7)}
        {makePiecePattern("piece4", 31, 8.76, 7.49)}
        {makePiecePattern("piece5", 9, 7.62, 0.25)}
        {makeClipPath()}
      </defs>
      {drawBackground()}
      {drawBoardCutOut()}
      {drawHorizontalRuns()}
      {drawDiagonal1Runs()}
      {drawDiagonal2Runs()}
    </svg>
  );
};
