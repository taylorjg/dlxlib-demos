import { Drawing } from "./drawing";

export const Thumbnail = () => {
  const puzzle = {};
  const drawingOptions = {};

  const solutionInternalRows = [
    { puzzle, cellId: 0, value: 9 },
    { puzzle, cellId: 1, value: 11 },
    { puzzle, cellId: 2, value: 18 },
    { puzzle, cellId: 3, value: 14 },
    { puzzle, cellId: 4, value: 6 },
    { puzzle, cellId: 5, value: 1 },
    { puzzle, cellId: 6, value: 17 },
    { puzzle, cellId: 7, value: 15 },
    { puzzle, cellId: 8, value: 8 },
    { puzzle, cellId: 9, value: 5 },
    { puzzle, cellId: 10, value: 7 },
    { puzzle, cellId: 11, value: 3 },
    { puzzle, cellId: 12, value: 13 },
    { puzzle, cellId: 13, value: 4 },
    { puzzle, cellId: 14, value: 2 },
    { puzzle, cellId: 15, value: 19 },
    { puzzle, cellId: 16, value: 10 },
    { puzzle, cellId: 17, value: 12 },
    { puzzle, cellId: 18, value: 16 },
  ];

  return (
    <Drawing
      puzzle={puzzle}
      solutionInternalRows={solutionInternalRows}
      drawingOptions={drawingOptions}
    />
  );
};
