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
    makeSolutionInternalRow("F", Orientation.North, false, 0, 1),
    makeSolutionInternalRow("I", Orientation.East, false, 7, 0),
    makeSolutionInternalRow("L", Orientation.South, false, 3, 6),
    makeSolutionInternalRow("N", Orientation.East, false, 4, 1),
    makeSolutionInternalRow("P", Orientation.North, true, 0, 6),
    makeSolutionInternalRow("T", Orientation.South, false, 5, 5),
    makeSolutionInternalRow("U", Orientation.East, false, 0, 0),
    makeSolutionInternalRow("V", Orientation.East, false, 3, 0),
    makeSolutionInternalRow("W", Orientation.East, false, 0, 3),
    makeSolutionInternalRow("X", Orientation.North, false, 1, 4),
    makeSolutionInternalRow("Y", Orientation.East, true, 5, 0),
    makeSolutionInternalRow("Z", Orientation.North, true, 4, 4),
  ];
};

const makeSolutionInternalRow = (
  label: string,
  orientation: Orientation,
  reflected: boolean,
  row: number,
  col: number
): InternalRow => {
  for (const pwv of piecesWithVariations) {
    if (pwv.label === label) {
      const variation = pwv.variations.find(
        (v) => v.orientation === orientation && v.reflected === reflected
      );
      if (variation) {
        const location = { row, col };
        return { label, variation, location };
      }
    }
  }
  throw new Error("[makeSolutionInternalRow] failed to find variation");
};
