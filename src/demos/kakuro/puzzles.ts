import { Coords } from "types"
import { range } from "utils"
import { Clue } from "./clue"
import { Puzzle } from "./puzzle"
import { Run } from "./run"

const makeLabelDict = (size: number, grid: string[]): Map<string, Coords> => {
  const dict = new Map<string, Coords>()
  for (const row of range(size)) {
    for (const col of range(size)) {
      const ch = grid[row][col]
      if (/[A-Za-z]/.test(ch)) {
        dict.set(ch, { row, col })
      }
    }
  }
  return dict
}

const findBlocks = (size: number, grid: string[]): Coords[] => {
  const blocks: Coords[] = []
  for (const row of range(size)) {
    for (const col of range(size)) {
      const ch = grid[row][col]
      if (/[A-Za-z-]/.test(ch)) {
        blocks.push({ row, col })
      }
    }
  }
  return blocks
}

const findUnknowns = (size: number, grid: string[]): Coords[] => {
  const unknowns: Coords[] = []
  for (const row of range(size)) {
    for (const col of range(size)) {
      const ch = grid[row][col]
      if (ch === ".") {
        unknowns.push({ row, col })
      }
    }
  }
  return unknowns
}

const parsePuzzle = (grid: string[], cluesString: string): Puzzle => {
  const size = grid.length
  // const labelDict = makeLabelDict(size, grid)
  const blocks = findBlocks(size, grid)
  const clues: Clue[] = []
  var unknowns = findUnknowns(size, grid)
  var horizontalRuns: Run[] = []
  var verticalRuns: Run[] = []
  return { size, blocks, clues, unknowns, horizontalRuns, verticalRuns }
}

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
      "a..b..c..-"
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
  )
]
