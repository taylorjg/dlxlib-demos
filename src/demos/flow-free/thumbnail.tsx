import { Coords } from "types";
import { first } from "utils";
import { Drawing } from "./drawing";
import { InternalRow } from "./internal-row";
import { Puzzle } from "./puzzle";
import { puzzles } from "./puzzles";

export const Thumbnail = () => {
  const { puzzle, solutionInternalRows } = makeThumbnailSolution();
  const drawingOptions = { showLabels: false };

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
  const solutionInternalRows = makeSolution(puzzle);
  return { puzzle, solutionInternalRows };
};

const makeSolution = (puzzle: Puzzle): InternalRow[] => {
  return [
    makeInternalRow(puzzle, "A", "0,3 0,2 0,1 1,1 2,1 3,1"),
    makeInternalRow(puzzle, "B", "3,4 4,4 4,3 4,2"),
    makeInternalRow(puzzle, "C", "0,0 1,0 2,0 3,0 4,0 4,1"),
    makeInternalRow(puzzle, "D", "1,3 1,2 2,2"),
    makeInternalRow(puzzle, "E", "0,4 1,4 2,4 2,3 3,3 3,2"),
  ];
};

const makeInternalRow = (
  puzzle: Puzzle,
  label: string,
  coordsListString: string
): InternalRow => {
  const colourPair = puzzle.colourPairs.find((cp) => cp.label === label)!;
  const coordsList = parseCoordsListString(coordsListString);
  return { puzzle, colourPair, coordsList };
};

const parseCoordsListString = (coordsListString: string): Coords[] => {
  return coordsListString
    .split(/\s/)
    .map((s) => s.trim())
    .filter(Boolean)
    .map(parseCoordsString);
};

const parseCoordsString = (coordsString: string): Coords => {
  const bits = coordsString.split(",").map((s) => s.trim());
  const row = Number(bits[0]);
  const col = Number(bits[1]);
  return { row, col };
};
