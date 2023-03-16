import { AvailableDemo } from "types";
import { Thumbnail as SudokuThumbnail } from "demos/sudoku/thumbnail"
import { Thumbnail as PentominoesThumbnail } from "demos/pentominoes/thumbnail"
import { Thumbnail as DraughtboardPuzzleThumbnail } from "demos/draughtboard-puzzle/thumbnail"
import { Thumbnail as NQueensThumbnail } from "demos/n-queens/thumbnail"
import { Thumbnail as TetraSticksThumbnail } from "demos/tetrasticks/thumbnail"
import { Thumbnail as AztecDiamondThumbnail } from "demos/aztec-diamond/thumbnail"
import { Thumbnail as RippleEffectThumbnail } from "demos/ripple-effect/thumbnail"
import { Thumbnail as FlowFreeThumbnail } from "demos/flow-free/thumbnail"
import { Thumbnail as KakuroThumbnail } from "demos/kakuro/thumbnail"
import { Thumbnail as NonogramThumbnail } from "demos/nonogram/thumbnail"
import { Thumbnail as CrosswordThumbnail } from "demos/crossword/thumbnail"
import { Thumbnail as PlaceholderThumbnail } from "demos/placeholder/thumbnail"

import rippleEffectReadmeSource from "demos/ripple-effect/README.md"
import flowFreeReadmeSource from "demos/flow-free/README.md"

const demoNames = [
  "Sudoku",
  "Pentominoes",
  "Draughtboard Puzzle",
  "N Queens",
  "TetraSticks",
  "Aztec Diamond",
  "Ripple Effect",
  "Flow Free",
  "Kakuro",
  "Nonogram",
  "Crossword"
]

const thumbnailMap = new Map<string, React.FC>([
  ["sudoku", SudokuThumbnail],
  ["pentominoes", PentominoesThumbnail],
  ["draughtboard-puzzle", DraughtboardPuzzleThumbnail],
  ["n-queens", NQueensThumbnail],
  ["tetrasticks", TetraSticksThumbnail],
  ["aztec-diamond", AztecDiamondThumbnail],
  ["ripple-effect", RippleEffectThumbnail],
  ["flow-free", FlowFreeThumbnail],
  ["kakuro", KakuroThumbnail],
  ["nonogram", NonogramThumbnail],
  ["crossword", CrosswordThumbnail]
])

const hideBorderMap = new Map<string, boolean>([
  ["pentominoes", true],
  ["draughtboard-puzzle", true],
  ["n-queens", true],
  ["flow-free", true],
  ["tetrasticks", true],
  ["aztec-diamond", true]
])

const readmeSourceMap = new Map<string, string>([
  ["ripple-effect", rippleEffectReadmeSource],
  ["flow-free", flowFreeReadmeSource]
])

const makeShortName = (name: string): string => name.toLowerCase().replace(/\s/g, "-")

export const availableDemos: AvailableDemo[] = demoNames
  .map(name => {
    const shortName = makeShortName(name)
    const hideBorder = hideBorderMap.get(shortName) ?? false
    const maybeReadmeSource = readmeSourceMap.has(shortName)
      ? { readmeSource: readmeSourceMap.get(shortName) }
      : undefined
    return {
      name,
      shortName,
      Thumbnail: thumbnailMap.get(shortName) ?? PlaceholderThumbnail,
      hideBorder,
      ...maybeReadmeSource
    }
  })

export const lookupAvailableDemoByShortName = (shortName: string) => {
  return availableDemos.find(availableDemo => availableDemo.shortName === shortName)
}
