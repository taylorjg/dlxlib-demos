import { InitialValue } from "./initial-value"
import { Room } from "./room"

export type Puzzle = {
  name: string,
  size: number,
  maxValue: number,
  rooms: Room[],
  initialValues: InitialValue[]
}
