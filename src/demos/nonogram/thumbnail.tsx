import { Coords } from "types";
import { first, range } from "utils";
import { Drawing } from "./drawing";
import { InternalRow } from "./internal-row";
import { Puzzle } from "./puzzle";
import { puzzles } from "./puzzles";

export const Thumbnail = () => {
  const { puzzle, solutionInternalRows } = makeThumbnailSolution();
  const drawingOptions = { showClues: true };

  return (
    <Drawing
      puzzle={puzzle}
      solutionInternalRows={solutionInternalRows}
      drawingOptions={drawingOptions}
    />
  );
};

export const makeThumbnailSolution = () => {
  const puzzle = first(puzzles);
  const solution = [
    "...XXXX...",
    "X.XXXXXX..",
    "X..XXXX...",
    "XX..XX....",
    ".XXXXXXXX.",
    "....XX..XX",
    "...XXXX..X",
    "..XX..XX.X",
    "..X....X..",
    "XXX....XXX",
  ];
  const solutionInternalRows = parseSolution(puzzle, solution);
  return { puzzle, solutionInternalRows };
};

const parseSolution = (puzzle: Puzzle, solution: string[]): InternalRow[] => {
  const horizontalRunsDict = parseHorizontalRuns(puzzle, solution);
  const verticalRunsDict = parseVerticalRuns(puzzle, solution);

  const solutionInternalRows: InternalRow[] = [];

  for (const runGroup of puzzle.horizontalRunGroups) {
    const coordsLists = horizontalRunsDict.get(runGroup.row);
    if (!coordsLists) {
      throw new Error(`[parseSolution] row not in horizontalRunsDict`);
    }
    const solutionInternalRow = { puzzle, runGroup, coordsLists };
    solutionInternalRows.push(solutionInternalRow);
  }

  for (const runGroup of puzzle.verticalRunGroups) {
    const coordsLists = verticalRunsDict.get(runGroup.col);
    if (!coordsLists) {
      throw new Error(`[parseSolution] col not in verticalRunsDict`);
    }
    const solutionInternalRow = { puzzle, runGroup, coordsLists };
    solutionInternalRows.push(solutionInternalRow);
  }

  return solutionInternalRows;
};

const parseHorizontalRuns = (
  puzzle: Puzzle,
  solution: string[]
): Map<number, Coords[][]> => {
  const size = solution.length;
  const dict = new Map<number, Coords[][]>();
  for (const horizontalRunGroup of puzzle.horizontalRunGroups) {
    const row = horizontalRunGroup.row;
    const cols = range(size);
    const blocks = cols
      .filter((col) => solution[row][col] === "X")
      .map((col) => ({ row, col }));
    let accumulatedLength = 0;
    const coordsLists: Coords[][] = [];
    for (const length of horizontalRunGroup.lengths) {
      const coordsList = blocks.slice(accumulatedLength).slice(0, length);
      coordsLists.push(coordsList);
      accumulatedLength += length;
    }
    dict.set(row, coordsLists);
  }
  return dict;
};

const parseVerticalRuns = (
  puzzle: Puzzle,
  solution: string[]
): Map<number, Coords[][]> => {
  const size = solution.length;
  const dict = new Map<number, Coords[][]>();
  for (const verticalRunGroup of puzzle.verticalRunGroups) {
    const col = verticalRunGroup.col;
    const rows = range(size);
    const blocks = rows
      .filter((row) => solution[row][col] === "X")
      .map((row) => ({ row, col }));
    let accumulatedLength = 0;
    const coordsLists: Coords[][] = [];
    for (const length of verticalRunGroup.lengths) {
      const coordsList = blocks.slice(accumulatedLength).slice(0, length);
      coordsLists.push(coordsList);
      accumulatedLength += length;
    }
    dict.set(col, coordsLists);
  }
  return dict;
};
