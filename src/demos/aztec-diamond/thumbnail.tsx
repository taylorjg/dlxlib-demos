import { Orientation } from "./orientation";
import { Drawing } from "./drawing";
import { InternalRow } from "./internal-row";
import { piecesWithVariations } from "./pieces-with-variations";

export const Thumbnail = () => {
  const { puzzle, solutionInternalRows } = makeThumbnailSolution();
  const drawingOptions = {};

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
    makeSolutionInternalRow("I", Orientation.North, false, 3, 2),
    makeSolutionInternalRow("O", Orientation.North, false, 4, 8),
    makeSolutionInternalRow("T", Orientation.North, false, 3, 5),
    makeSolutionInternalRow("U", Orientation.West, false, 2, 6),
    makeSolutionInternalRow("V", Orientation.South, false, 1, 4),
    makeSolutionInternalRow("W", Orientation.East, false, 2, 1),
    makeSolutionInternalRow("X", Orientation.North, false, 5, 2),

    makeSolutionInternalRow("F", Orientation.West, false, 5, 6),
    makeSolutionInternalRow("H", Orientation.South, false, 2, 4),
    makeSolutionInternalRow("J", Orientation.South, false, 0, 4),
    makeSolutionInternalRow("L", Orientation.North, false, 6, 4),
    makeSolutionInternalRow("N", Orientation.East, false, 3, 3),
    makeSolutionInternalRow("P", Orientation.North, false, 3, 7),
    makeSolutionInternalRow("R", Orientation.East, false, 3, 2),
    makeSolutionInternalRow("Y", Orientation.East, false, 1, 3),
    makeSolutionInternalRow("Z", Orientation.East, false, 6, 5),

    makeSolutionInternalRow("F", Orientation.South, true, 4, 1),
    makeSolutionInternalRow("H", Orientation.West, true, 7, 2),
    makeSolutionInternalRow("J", Orientation.East, true, 4, 0),
    makeSolutionInternalRow("L", Orientation.West, true, 5, 5),
    makeSolutionInternalRow("N", Orientation.North, true, 4, 5),
    makeSolutionInternalRow("P", Orientation.South, true, 5, 4),
    makeSolutionInternalRow("R", Orientation.East, true, 7, 4),
    makeSolutionInternalRow("Y", Orientation.West, true, 4, 2),
    makeSolutionInternalRow("Z", Orientation.North, true, 1, 2),
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
