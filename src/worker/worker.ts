// To fix: Unexpected use of 'self'.
/* eslint-disable no-restricted-globals */

import * as dlxlib from "dlxlib/dlx";
import { Mode, IDemo, UIToWorkerMessage, UIToWorkerSolveMessage } from "types";
import { checkStopToken } from "./stop-token";
import { timeIt } from "./time-it";

import { Demo as SudokuDemo } from "demos/sudoku/demo";
import { Demo as PentominoesDemo } from "demos/pentominoes/demo";
import { Demo as DraughtboardPuzzleDemo } from "demos/draughtboard-puzzle/demo";
import { Demo as NQueensDemo } from "demos/n-queens/demo";
import { Demo as TetraSticksDemo } from "demos/tetrasticks/demo";
import { Demo as AztecDiamondDemo } from "demos/aztec-diamond/demo";
import { Demo as RippleEffectDemo } from "demos/ripple-effect/demo";
import { Demo as FlowFreeDemo } from "demos/flow-free/demo";
import { Demo as KakuroDemo } from "demos/kakuro/demo";
import { Demo as NonogramDemo } from "demos/nonogram/demo";
import { Demo as CrosswordDemo } from "demos/crossword/demo";

type DemoConstructor = new () => IDemo<unknown, unknown>;

const map = new Map<string, DemoConstructor>([
  ["sudoku", SudokuDemo],
  ["pentominoes", PentominoesDemo],
  ["draughtboard-puzzle", DraughtboardPuzzleDemo],
  ["n-queens", NQueensDemo],
  ["tetrasticks", TetraSticksDemo],
  ["aztec-diamond", AztecDiamondDemo],
  ["ripple-effect", RippleEffectDemo],
  ["flow-free", FlowFreeDemo],
  ["kakuro", KakuroDemo],
  ["nonogram", NonogramDemo],
  ["crossword", CrosswordDemo],
]);

// To fix: 'worker.ts' cannot be compiled under '--isolatedModules' because it is considered a global script file. Add an import, export, or an empty 'export {}' statement to make it a module.ts(1208)
export {};

type SearchStepEvent = {
  partialSolution: number[];
  stepIndex: number;
};

type SolutionFoundEvent = {
  solution: number[];
  solutionIndex: number;
};

const onSolve = (
  stopToken: string,
  shortName: string,
  puzzle: unknown,
  mode: Mode
) => {
  const checkForCancellation = (sendMessage = false) => {
    const cancelled = checkStopToken(stopToken);
    if (cancelled && sendMessage) {
      console.log("[worker onSolve]", "cancelled!");
      self.postMessage({ type: "cancelled" });
    }
    return cancelled;
  };

  console.log("[worker onSolve]");
  const demoConstructor = map.get(shortName);
  if (!demoConstructor) {
    self.postMessage({
      type: "error",
      message: `unknown demo short name, "${shortName}"`,
    });
    return;
  }

  const demo = new demoConstructor();

  console.log("[worker onSolve]", "building internal rows...");
  const internalRows = timeIt("build internal rows", () =>
    demo.buildInternalRows(puzzle, checkForCancellation)
  );
  console.log("[worker onSolve]", "internalRows.length:", internalRows.length);
  if (checkForCancellation(true)) return;

  console.log("[worker onSolve]", "building matrix...");
  const matrix = timeIt("build matrix", () => {
    const matrix: Uint8Array[] = [];
    for (let index = 0; index < internalRows.length; index++) {
      if (index % 1000 === 0) {
        if (checkForCancellation()) {
          break;
        }
      }
      const internalRow = internalRows[index];
      const matrixRow = demo.internalRowToMatrixRow(internalRow);
      matrix.push(Uint8Array.from(matrixRow));
    }
    return matrix;
  });
  const rowCount = matrix.length;
  const colCount = matrix[0]?.length ?? 0;
  console.log("[worker onSolve]", "matrix size:", `${rowCount}x${colCount}`);
  if (checkForCancellation(true)) return;

  const numSolutions = 1;
  const numPrimaryColumns = demo.getNumPrimaryColumns(puzzle);

  console.log("[worker onSolve]", "numPrimaryColumns:", numPrimaryColumns);

  const options: dlxlib.Options = {
    numSolutions,
    numPrimaryColumns,
    checkForCancellation,
  };

  let searchStepCount = 0;

  const onStep = (event: SearchStepEvent) => {
    searchStepCount++;
    if (searchStepCount % 100 === 0) {
      console.log("[worker onStep]", "searchStepCount:", searchStepCount);
    }
    if (mode === Mode.SearchSteps) {
      const partialSolution = event.partialSolution;
      const solutionInternalRows = partialSolution.map(
        (index) => internalRows[index]
      );
      self.postMessage({ type: "searchStep", solutionInternalRows });
    }
  };

  const onSolution = (event: SolutionFoundEvent) => {
    console.log(
      "[worker onSolution]",
      "solutionIndex:",
      event.solutionIndex,
      "row count:",
      event.solution.length
    );
    const solution = event.solution;
    const solutionInternalRows = solution.map((index) => internalRows[index]);
    self.postMessage({ type: "solutionFound", solutionInternalRows });
  };

  const dlx = new dlxlib.Dlx();
  dlx.addListener("step", onStep);
  dlx.addListener("solution", onSolution);

  console.log("[worker onSolve]", "solving matrix...");
  const solutions = timeIt("solve matrix", () => dlx.solve(matrix, options));
  console.log("[worker onSolve]", "searchStepCount:", searchStepCount);
  console.log("[worker onSolve]", "solutions.length:", solutions.length);
  if (checkForCancellation(true)) return;

  self.postMessage({ type: "finished", numSolutionsFound: solutions.length });
};

self.onmessage = (ev: MessageEvent<UIToWorkerMessage>) => {
  try {
    console.log("[worker onmessage]", "ev.data.type:", ev.data.type);
    if (ev.data.type === "solve") {
      const message = ev.data as UIToWorkerSolveMessage;
      const { stopToken, shortName, puzzle, mode } = message;
      timeIt("onSolve", () => onSolve(stopToken, shortName, puzzle, mode));
      return;
    }

    if (ev.data.type === "close") {
      self.close();
      return;
    }
  } catch (error) {
    console.error("error:", error);
    if (error instanceof Error) {
      self.postMessage({ type: "error", errorMessage: error.message });
    } else {
      self.postMessage({ type: "error", errorMessage: String(error) });
    }
  }
};
