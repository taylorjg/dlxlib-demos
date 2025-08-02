import { AvailableDemo } from "types";
import { Thumbnail as SudokuThumbnail } from "demos/sudoku/thumbnail";
import { Thumbnail as PentominoesThumbnail } from "demos/pentominoes/thumbnail";
import { Thumbnail as DraughtboardPuzzleThumbnail } from "demos/draughtboard-puzzle/thumbnail";
import { Thumbnail as NQueensThumbnail } from "demos/n-queens/thumbnail";
import { Thumbnail as TetraSticksThumbnail } from "demos/tetrasticks/thumbnail";
import { Thumbnail as AztecDiamondThumbnail } from "demos/aztec-diamond/thumbnail";
import { Thumbnail as RippleEffectThumbnail } from "demos/ripple-effect/thumbnail";
import { Thumbnail as FlowFreeThumbnail } from "demos/flow-free/thumbnail";
import { Thumbnail as KakuroThumbnail } from "demos/kakuro/thumbnail";
import { Thumbnail as NonogramThumbnail } from "demos/nonogram/thumbnail";
import { Thumbnail as CrosswordThumbnail } from "demos/crossword/thumbnail";
import { Thumbnail as AristotleNumbersThumbnail } from "demos/aristotle-numbers/thumbnail";

import sudokuReadmeSource from "demos/sudoku/README.md";
import pentominoesReadmeSource from "demos/pentominoes/README.md";
import draughtboardPuzzleReadmeSource from "demos/draughtboard-puzzle/README.md";
import nQueensReadmeSource from "demos/n-queens/README.md";
import rippleEffectReadmeSource from "demos/ripple-effect/README.md";
import flowFreeReadmeSource from "demos/flow-free/README.md";

export const availableDemos: AvailableDemo[] = [
  {
    name: "Sudoku",
    shortName: "sudoku",
    Thumbnail: SudokuThumbnail,
    hideBorder: false,
    readmeSource: sudokuReadmeSource,
  },
  {
    name: "Pentominoes",
    shortName: "pentominoes",
    Thumbnail: PentominoesThumbnail,
    hideBorder: true,
    readmeSource: pentominoesReadmeSource,
  },
  {
    name: "Draughtboard Puzzle",
    shortName: "draughtboard-puzzle",
    Thumbnail: DraughtboardPuzzleThumbnail,
    hideBorder: true,
    readmeSource: draughtboardPuzzleReadmeSource,
  },
  {
    name: "N Queens",
    shortName: "n-queens",
    Thumbnail: NQueensThumbnail,
    hideBorder: true,
    readmeSource: nQueensReadmeSource,
  },
  {
    name: "TetraSticks",
    shortName: "tetrasticks",
    Thumbnail: TetraSticksThumbnail,
    hideBorder: true,
  },
  {
    name: "Aztec Diamond",
    shortName: "aztec-diamond",
    Thumbnail: AztecDiamondThumbnail,
    hideBorder: true,
  },
  {
    name: "Ripple Effect",
    shortName: "ripple-effect",
    Thumbnail: RippleEffectThumbnail,
    hideBorder: false,
    readmeSource: rippleEffectReadmeSource,
  },
  {
    name: "Flow Free",
    shortName: "flow-free",
    Thumbnail: FlowFreeThumbnail,
    hideBorder: true,
    readmeSource: flowFreeReadmeSource,
  },
  {
    name: "Kakuro",
    shortName: "kakuro",
    Thumbnail: KakuroThumbnail,
    hideBorder: false,
  },
  {
    name: "Nonogram",
    shortName: "nonogram",
    Thumbnail: NonogramThumbnail,
    hideBorder: false,
  },
  {
    name: "Crossword",
    shortName: "crossword",
    Thumbnail: CrosswordThumbnail,
    hideBorder: false,
  },
  {
    name: "Aristotle's Number Puzzle",
    shortName: "aristotle-numbers",
    Thumbnail: AristotleNumbersThumbnail,
    hideBorder: true,
  },
];

export const lookupAvailableDemoByShortName = (shortName: string) => {
  return availableDemos.find(
    (availableDemo) => availableDemo.shortName === shortName
  );
};
