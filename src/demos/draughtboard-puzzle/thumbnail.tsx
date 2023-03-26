import { Orientation } from "./orientation";
import { Drawing } from "./drawing";
import { InternalRow } from "./internal-row";
import { piecesWithVariations } from "./pieces-with-variations";

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
  const puzzle = {};
  const solutionInternalRows = makeSolution();
  return { puzzle, solutionInternalRows };
};

const makeSolution = (): InternalRow[] => {
  return [
    makeSolutionInternalRow("A", Orientation.North, 2, 0),
    makeSolutionInternalRow("B", Orientation.South, 1, 4),
    makeSolutionInternalRow("C", Orientation.West, 6, 6),
    makeSolutionInternalRow("D", Orientation.North, 5, 1),
    makeSolutionInternalRow("E", Orientation.East, 3, 1),
    makeSolutionInternalRow("F", Orientation.East, 0, 1),
    makeSolutionInternalRow("G", Orientation.West, 5, 0),
    makeSolutionInternalRow("H", Orientation.North, 3, 5),
    makeSolutionInternalRow("I", Orientation.South, 2, 6),
    makeSolutionInternalRow("J", Orientation.West, 0, 4),
    makeSolutionInternalRow("K", Orientation.North, 5, 4),
    makeSolutionInternalRow("L", Orientation.East, 0, 0),
    makeSolutionInternalRow("M", Orientation.North, 4, 3),
    makeSolutionInternalRow("N", Orientation.East, 2, 2),
  ];
};

const makeSolutionInternalRow = (
  label: string,
  orientation: Orientation,
  row: number,
  col: number
): InternalRow => {
  for (const pwv of piecesWithVariations) {
    if (pwv.label === label) {
      const variation = pwv.variations.find(
        (v) => v.orientation === orientation
      );
      if (variation) {
        const location = { row, col };
        return { label, variation, location };
      }
    }
  }
  throw new Error("[makeSolutionInternalRow] failed to find variation");
};
