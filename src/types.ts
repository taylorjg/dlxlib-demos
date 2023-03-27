import { range } from "utils";

export type EmptyPuzzle = Record<string, never>;
export type EmptyInternalRow = Record<string, never>;
export type EmptyDrawingOptions = Record<string, never>;

export type AvailableDemo = {
  name: string;
  shortName: string;
  Thumbnail: React.FC;
  hideBorder: boolean;
  readmeSource?: string;
};

export type DrawingProps<
  TPuzzle,
  TInternalRow,
  TDrawingOptions = EmptyDrawingOptions
> = {
  puzzle: TPuzzle;
  solutionInternalRows: TInternalRow[];
  drawingOptions: TDrawingOptions;
};

export type DemoControlsProps<
  TPuzzle,
  TDrawingOptions = EmptyDrawingOptions
> = {
  selectedPuzzle: TPuzzle;
  drawingOptions: TDrawingOptions;
  onSelectedPuzzleChanged: (puzzle: TPuzzle) => void;
  onDrawingOptionsChanged: (drawingOptions: TDrawingOptions) => void;
};

export interface IDemo<TPuzzle, TInternalRow> {
  buildInternalRows(
    puzzle: TPuzzle,
    checkForCancellation: () => boolean
  ): TInternalRow[];
  internalRowToMatrixRow(internalRow: TInternalRow): number[];
  getNumPrimaryColumns(puzzle: TPuzzle): number | undefined;
}

export type Point = {
  x: number;
  y: number;
};

export type Coords = {
  row: number;
  col: number;
};

export const goUp = (coords: Coords): Coords => ({
  row: coords.row - 1,
  col: coords.col,
});
export const goDown = (coords: Coords): Coords => ({
  row: coords.row + 1,
  col: coords.col,
});
export const goLeft = (coords: Coords): Coords => ({
  row: coords.row,
  col: coords.col - 1,
});
export const goRight = (coords: Coords): Coords => ({
  row: coords.row,
  col: coords.col + 1,
});

export const sameCoords = (coords1: Coords, coords2: Coords): boolean =>
  coords1.row === coords2.row && coords1.col === coords2.col;

export const addCoords = (coords1: Coords, coords2: Coords): Coords => ({
  row: coords1.row + coords2.row,
  col: coords1.col + coords2.col,
});

export const sameCoordsList = (
  coordsList1: Coords[],
  coordsList2: Coords[]
): boolean => {
  if (coordsList1.length !== coordsList2.length) return false;
  for (const index of range(coordsList1.length)) {
    const coords1 = coordsList1[index];
    const coords2 = coordsList2[index];
    if (!sameCoords(coords1, coords2)) return false;
  }
  return true;
};

export const coordsComparer = (coords1: Coords, coords2: Coords): number => {
  const rowDiff = coords1.row - coords2.row;
  const colDiff = coords1.col - coords2.col;
  return rowDiff !== 0 ? rowDiff : colDiff;
};

export enum CurrentState {
  Clean,
  Solving,
  Dirty,
}

export enum Mode {
  FirstSolution,
  SearchSteps,
}

export type UIToWorkerSolveMessage = {
  type: string;
  stopToken: string;
  shortName: string;
  puzzle: unknown;
  mode: Mode;
};

export type UIToWorkerCloseMessage = {
  type: string;
};

export type UIToWorkerMessage = UIToWorkerSolveMessage | UIToWorkerCloseMessage;

export type WorkerToUISearchStepMessage = {
  type: string;
  solutionInternalRows: unknown[];
};

export type WorkerToUISolutionFoundMessage = {
  type: string;
  solutionInternalRows: unknown[];
};

export type WorkerToUIFinishedMessage = {
  type: string;
  numSolutionsFound: number;
};

export type WorkerToUIErrorMessage = {
  type: string;
  errorMessage: string;
};

export type WorkerToUICancelledMessage = {
  type: string;
};

export type WorkerToUIMessage =
  | WorkerToUISearchStepMessage
  | WorkerToUISolutionFoundMessage
  | WorkerToUIFinishedMessage
  | WorkerToUIErrorMessage
  | WorkerToUICancelledMessage;
