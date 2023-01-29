import { Coords } from "types"

export type SudokuInternalRow = {
  coords: Coords
  value: number,
  isInitialValue: boolean
}
