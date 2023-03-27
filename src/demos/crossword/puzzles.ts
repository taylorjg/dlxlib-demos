import { Coords, goDown, goRight, sameCoords } from "types";
import { intersect, range } from "utils";
import { Clue } from "./clue";
import { ClueType } from "./clue-type";
import { Puzzle } from "./puzzle";

const makePuzzle = (
  name: string,
  grid: string[],
  acrossClueCandidates: Map<number, string[]>,
  downClueCandidates: Map<number, string[]>
): Puzzle => {
  const size = grid.length;
  const blocks = findBlocks(grid);
  const { acrossClues, downClues } = findClues(grid);
  const clues: Clue[] = [];

  for (const [clueNumber, coordsList] of acrossClues) {
    const candidates = acrossClueCandidates.get(clueNumber);
    if (!candidates) {
      throw new Error(
        `[makePuzzle] failed to find candidates for across clue number ${clueNumber}`
      );
    }
    const clueType = ClueType.Across;
    const clue = { clueType, clueNumber, coordsList, candidates };
    clues.push(clue);
  }

  for (const [clueNumber, coordsList] of downClues) {
    const candidates = downClueCandidates.get(clueNumber);
    if (!candidates) {
      throw new Error(
        `[makePuzzle] failed to find candidates for down clue number ${clueNumber}`
      );
    }
    const clueType = ClueType.Down;
    const clue = { clueType, clueNumber, coordsList, candidates };
    clues.push(clue);
  }

  const allAcrossSquares = clues
    .filter((clue) => clue.clueType === ClueType.Across)
    .flatMap((clue) => clue.coordsList);

  const allDownSquares = clues
    .filter((clue) => clue.clueType === ClueType.Down)
    .flatMap((clue) => clue.coordsList);

  const crossCheckingSquares = intersect(
    allAcrossSquares,
    allDownSquares,
    sameCoords
  );

  return { name, size, blocks, clues, crossCheckingSquares };
};

const findBlocks = (grid: string[]): Coords[] => {
  const blocks: Coords[] = [];
  const size = grid.length;
  for (const row of range(size)) {
    for (const col of range(size)) {
      if (grid[row][col] === "X") {
        const block = { row, col };
        blocks.push(block);
      }
    }
  }
  return blocks;
};

const findClues = (
  grid: string[]
): { acrossClues: Map<number, Coords[]>; downClues: Map<number, Coords[]> } => {
  const acrossClues = new Map<number, Coords[]>();
  const downClues = new Map<number, Coords[]>();

  const size = grid.length;
  const isBlock = (row: number, col: number) =>
    row < 0 || row >= size || col < 0 || col >= size || grid[row][col] === "X";
  const leftIsBlock = (row: number, col: number) => isBlock(row, col - 1);
  const rightIsBlock = (row: number, col: number) => isBlock(row, col + 1);
  const upIsBlock = (row: number, col: number) => isBlock(row - 1, col);
  const downIsBlock = (row: number, col: number) => isBlock(row + 1, col);

  const findCoordsList = (
    coords: Coords,
    advance: (coords: Coords) => Coords
  ): Coords[] => {
    const coordsList = [coords];
    let currentCoords = coords;
    for (;;) {
      currentCoords = advance(currentCoords);
      if (isBlock(currentCoords.row, currentCoords.col)) break;
      coordsList.push(currentCoords);
    }
    return coordsList;
  };

  let nextClueNumber = 1;

  for (const row of range(size)) {
    for (const col of range(size)) {
      if (grid[row][col] === "X") continue;
      const newAcrossClue = leftIsBlock(row, col) && !rightIsBlock(row, col);
      const newDownClue = upIsBlock(row, col) && !downIsBlock(row, col);
      const coords = { row, col };
      if (newAcrossClue) {
        const coordsList = findCoordsList(coords, goRight);
        acrossClues.set(nextClueNumber, coordsList);
      }
      if (newDownClue) {
        const coordsList = findCoordsList(coords, goDown);
        downClues.set(nextClueNumber, coordsList);
      }
      if (newAcrossClue || newDownClue) nextClueNumber++;
    }
  }

  return { acrossClues, downClues };
};

export const puzzles = [
  makePuzzle(
    "Telegraph Quick 30,199",
    [
      "......X....XX",
      ".X.X.X.X.X.X.",
      "...X.........",
      ".X.X.X.X.X.X.",
      ".......X.....",
      ".XXX.X.XXX.X.",
      "X.....X.....X",
      ".X.XXX.X.XXX.",
      ".....X.......",
      ".X.X.X.X.X.X.",
      ".........X...",
      ".X.X.X.X.X.X.",
      "XX....X......",
    ],
    new Map<number, string[]>([
      [1, ["heifer"]], // young cow
      [4, ["loot"]], // swag
      [9, ["inn", "spa"]], // hotel
      [10, ["heypresto"]], // voila
      [11, ["durable", "chronic", "abiding", "settled"]], // long-lasting
      [12, ["shove", "drive", "nudge"]], // push
      [13, ["empty", "clear"]], // vacant
      [15, ["lanky", "rangy", "gaunt", "weedy"]], // tall and thin
      [20, ["agree", "allow", "grant", "admit"]], // be of one mind
      [22, ["risotto", "biryani"]], // rice dish
      [24, ["primitive", "inelegant"]], //  crude
      [25, ["mug", "ass", "nit"]], // fool
      [26, ["dusk"]], // twilight
      [27, ["jester", "gagman", "mummer"]], // clown
    ]),
    new Map<number, string[]>([
      [1, ["hairdo"]], // perm, e.g.
      [2, ["inner", "chief", "focal", "prime"]], // central
      [3, ["exhibit", "display"]], // put on display
      [5, ["ogres"]], // trolls
      [6, ["tussock", "plumage", "topknot"]], // tuft
      [7, ["dyfed"]], // welsh county
      [8, ["yokel"]], // bumpkin
      [14, ["married"]], // wed
      [16, ["austere", "ascetic", "serious"]], // stern
      [17, ["happy", "merry", "jolly", "perky", "sunny"]], // pleased
      [18, ["trail", "dally", "tarry"]], // lag
      [19, ["cougar"]], // puma
      [21, ["epics"]], // spice (anag)
      [23, ["tempt", "court"]], // entice
    ])
  ),
];
