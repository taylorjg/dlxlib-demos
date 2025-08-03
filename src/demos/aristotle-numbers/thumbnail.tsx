import { Drawing } from "./drawing";
import { horizontalRuns, diagonal1Runs, diagonal2Runs } from "./demo";

export const Thumbnail = () => {
  const puzzle = {};
  const solutionInternalRows = makeThumbnailSolution();
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
  return [
    {
      run: horizontalRuns[0],
      values: [9, 11, 18],
    },
    {
      run: horizontalRuns[1],
      values: [14, 6, 1, 17],
    },
    {
      run: horizontalRuns[2],
      values: [15, 8, 5, 7, 3],
    },
    {
      run: horizontalRuns[3],
      values: [13, 4, 2, 19],
    },
    {
      run: horizontalRuns[4],
      values: [10, 12, 16],
    },

    {
      run: diagonal1Runs[0],
      values: [9, 14, 15],
    },
    {
      run: diagonal1Runs[1],
      values: [11, 6, 8, 13],
    },
    {
      run: diagonal1Runs[2],
      values: [18, 1, 5, 4, 10],
    },
    {
      run: diagonal1Runs[3],
      values: [17, 7, 2, 12],
    },
    {
      run: diagonal1Runs[4],
      values: [3, 19, 16],
    },

    {
      run: diagonal2Runs[0],
      values: [18, 17, 3],
    },
    {
      run: diagonal2Runs[1],
      values: [11, 1, 7, 19],
    },
    {
      run: diagonal2Runs[2],
      values: [9, 6, 5, 2, 16],
    },
    {
      run: diagonal2Runs[3],
      values: [14, 8, 4, 12],
    },
    {
      run: diagonal2Runs[4],
      values: [15, 13, 10],
    },
  ];
};
