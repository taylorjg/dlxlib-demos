import { Coords, sameCoords, goUp, goDown, goLeft, goRight } from "types"
import { range } from "utils"
import { ColourPair } from "./colour-pair"
import { Puzzle } from "./puzzle"

export const findPaths = (puzzle: Puzzle, colourPair: ColourPair): Coords[][] => {
  const start = colourPair.start
  const goal = colourPair.end
  const currentPath = [start]
  const paths: Coords[][] = []
  const maxDirectionChanges = puzzle.colourPairs.length

  findPathsInternal(puzzle, currentPath, paths, start, goal, maxDirectionChanges)

  return paths
}

// Inspired by this: https://stackoverflow.com/a/22464491
const findPathsInternal = (
  puzzle: Puzzle,
  currentPath: Coords[],
  paths: Coords[][],
  node: Coords,
  goal: Coords,
  maxDirectionChanges: number
): void => {
  for (const nextNode of neighbours(puzzle, node, goal)) {
    if (sameCoords(nextNode, goal)) {
      const path = [nextNode, ...currentPath]
      if (countDirectionChanges(path) <= maxDirectionChanges) {
        paths.push(path)
      }
    } else {
      const index = currentPath.findIndex(p => sameCoords(p, nextNode))
      if (index < 0) {
        currentPath.push(nextNode)
        if (countDirectionChanges(currentPath) <= maxDirectionChanges) {
          findPathsInternal(puzzle, currentPath, paths, nextNode, goal, maxDirectionChanges)
        }
        currentPath.pop()
      }
    }
  }
}

const neighbours = (puzzle: Puzzle, node: Coords, goal: Coords): Coords[] => {

  const dots = puzzle.colourPairs.flatMap(cp => [cp.start, cp.end])
  const isDot = (n: Coords) => dots.findIndex(d => sameCoords(d, n)) >= 0

  const ns = [
    goUp(node),
    goDown(node),
    goLeft(node),
    goRight(node)
  ]

  const isWithinPuzzle = (n: Coords) => (
    n.row >= 0 && n.row < puzzle.size &&
    n.col >= 0 && n.col < puzzle.size
  )

  const isEmptyLocationOrGoal = (n: Coords) =>
    !isDot(n) || sameCoords(n, goal)

  return ns
    .filter(isWithinPuzzle)
    .filter(isEmptyLocationOrGoal)
}

const countDirectionChanges = (path: Coords[]): number => {
  if (path.length < 3) return 0
  let count = 0
  for (const index of range(path.length).slice(1).slice(0, -1)) {
    const p1 = path[index - 1]
    const p3 = path[index + 1]
    const rowDiff = Math.abs(p3.row - p1.row)
    const colDiff = Math.abs(p3.col - p1.col)
    if (rowDiff !== 0 && colDiff !== 0) count++
  }
  return count
}
