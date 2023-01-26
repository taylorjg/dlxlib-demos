import { AvailableDemo } from "./types";

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

export const availableDemos: AvailableDemo[] = demoNames
  .map((name, index) => ({
    name,
    id: index + 1
  }))

export const lookupAvailableDemoByIdParam = (idParam: string) => {
  const number = Number(idParam)
  if (Number.isInteger(number)) {
    const index = number - 1;
    if (availableDemos[index]) {
      return availableDemos[index];
    }
  }
  return undefined
}
