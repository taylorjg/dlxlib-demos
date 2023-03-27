import { Coords, goDown, goRight, sameCoords } from "types";
import { range } from "utils";
import { Clue } from "./clue";
import { Puzzle } from "./puzzle";
import { Run } from "./run";
import { RunType } from "./run-type";

const makeLabelDict = (size: number, grid: string[]): Map<string, Coords> => {
  const dict = new Map<string, Coords>();
  for (const row of range(size)) {
    for (const col of range(size)) {
      const ch = grid[row][col];
      if (/[A-Za-z]/.test(ch)) {
        dict.set(ch, { row, col });
      }
    }
  }
  return dict;
};

const findBlocks = (size: number, grid: string[]): Coords[] => {
  const blocks: Coords[] = [];
  for (const row of range(size)) {
    for (const col of range(size)) {
      const ch = grid[row][col];
      if (/[A-Za-z-]/.test(ch)) {
        blocks.push({ row, col });
      }
    }
  }
  return blocks;
};

const findUnknowns = (size: number, grid: string[]): Coords[] => {
  const unknowns: Coords[] = [];
  for (const row of range(size)) {
    for (const col of range(size)) {
      const ch = grid[row][col];
      if (ch === ".") {
        unknowns.push({ row, col });
      }
    }
  }
  return unknowns;
};

const findRun = (
  unknowns: Coords[],
  startingPoint: Coords,
  advance: (coords: Coords) => Coords
): Coords[] => {
  const run: Coords[] = [];
  let currentCoords = startingPoint;
  const isInUnknowns = (coords: Coords) =>
    unknowns.findIndex((unknown) => sameCoords(unknown, coords)) >= 0;
  for (;;) {
    currentCoords = advance(currentCoords);
    if (!isInUnknowns(currentCoords)) break;
    run.push(currentCoords);
  }
  return run;
};

const findHorizontalRuns = (unknowns: Coords[], clues: Clue[]): Run[] => {
  return clues.flatMap((clue) => {
    if (clue.acrossSum) {
      const coordsList = findRun(unknowns, clue.coords, goRight);
      return [{ runType: RunType.Horizontal, coordsList, sum: clue.acrossSum }];
    }
    return [];
  });
};

const findVerticalRuns = (unknowns: Coords[], clues: Clue[]): Run[] => {
  return clues.flatMap((clue) => {
    if (clue.downSum) {
      const coordsList = findRun(unknowns, clue.coords, goDown);
      return { runType: RunType.Vertical, coordsList, sum: clue.downSum };
    }
    return [];
  });
};

const parseClues = (
  labelDict: Map<string, Coords>,
  cluesString: string
): Clue[] => {
  return cluesString
    .split(/\s/)
    .map((s) => s.trim())
    .filter(Boolean)
    .map((clueString) => parseClue(labelDict, clueString));
};

const parseClue = (
  labelDict: Map<string, Coords>,
  clueString: string
): Clue => {
  const bits = clueString.split(":").map((s) => s.trim());
  const label = bits[0];
  const sumsString = bits[1];
  const coords = labelDict.get(label);
  if (!coords) {
    throw new Error(`[parseClue] failed to find label ${label} in labelDict`);
  }

  const parseSum = (sumString: string): number | undefined => {
    const sum = Number(sumString);
    return Number.isInteger(sum) ? sum : undefined;
  };

  const sumsList = sumsString.split(",").map((s) => s.trim());
  const acrossSum = parseSum(sumsList[0] ?? "");
  const downSum = parseSum(sumsList[1] ?? "");

  return { coords, acrossSum, downSum };
};

const parsePuzzle = (grid: string[], cluesString: string): Puzzle => {
  const size = grid.length;
  const blocks = findBlocks(size, grid);
  const labelDict = makeLabelDict(size, grid);
  const unknowns = findUnknowns(size, grid);
  const clues = parseClues(labelDict, cluesString);
  const horizontalRuns = findHorizontalRuns(unknowns, clues);
  const verticalRuns = findVerticalRuns(unknowns, clues);
  return { size, blocks, clues, unknowns, horizontalRuns, verticalRuns };
};

export const puzzles = [
  parsePuzzle(
    [
      "--AB-CD-EF",
      "-G..H..I..",
      "J...K.....",
      "L....M...-",
      "N..O....PQ",
      "R..S...T..",
      "--U....V..",
      "-W...X....",
      "Y.....Z...",
      "a..b..c..-",
    ],
    `
      A:-,19 B:-,18 C:-,14 D:-,35 E:-,22 F:-,17
      G:16,15 H:9,- I:16,24
      J:7,- K:35,31
      L:29,- M:24,11
      N:3,- O:21,- P:-,26 Q:-,16
      R:4,- S:17,9 T:7,-
      U:11,17 V:17,6
      W:21,7 X:12,8
      Y:25,- Z:9,-
      a:4,- b:4,- c:4,-
    `
  ),
];
