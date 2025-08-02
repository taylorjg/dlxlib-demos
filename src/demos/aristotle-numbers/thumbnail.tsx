import { Drawing } from "./drawing";
import { RunType } from "./run-type";

export const Thumbnail = () => {
  const puzzle = {};
  const drawingOptions = {};

  const solutionInternalRows = [
    {
      run: {
        runType: RunType.Horizontal,
        cellIds: [0, 1, 2],
      },
      values: [9, 11, 18],
    },
    {
      run: {
        runType: RunType.Horizontal,
        cellIds: [3, 4, 5, 6],
      },
      values: [14, 6, 1, 17],
    },
    {
      run: {
        runType: RunType.Horizontal,
        cellIds: [7, 8, 9, 10, 11],
      },
      values: [15, 8, 5, 7, 3],
    },
    {
      run: {
        runType: RunType.Horizontal,
        cellIds: [12, 13, 14, 15],
      },
      values: [13, 4, 2, 19],
    },
    {
      run: {
        runType: RunType.Horizontal,
        cellIds: [16, 17, 18],
      },
      values: [10, 12, 16],
    },
  ];

  return (
    <Drawing
      puzzle={puzzle}
      solutionInternalRows={solutionInternalRows}
      drawingOptions={drawingOptions}
    />
  );
};
