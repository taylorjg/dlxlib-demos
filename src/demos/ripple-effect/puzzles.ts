
import { Coords, sameCoords } from "types"
import { maxBy, range } from "utils"
import { InitialValue } from "./initial-value"
import { Puzzle } from "./puzzle"
import { Room } from "./room"

const parsePuzzle = (name: string, roomLines: string[], initialValueLines: string[]): Puzzle => {
  const size = roomLines.length
  const initialValues = parseInitialValues(initialValueLines)
  const rooms = parseRooms(roomLines, initialValues)
  const maxValue = maxBy(rooms, room => room.cells.length)
  return { name, size, maxValue, rooms, initialValues }
}

const parseRooms = (roomLines: string[], initialValues: InitialValue[]): Room[] => {
  const rowCount = roomLines.length
  const colCount = roomLines[0].length
  const dict = new Map<string, Coords[]>()

  for (const row of range(rowCount)) {
    for (const col of range(colCount)) {
      const cell = { row, col }
      const label = roomLines[row][col]
      const coordsList = dict.get(label)
      if (coordsList) {
        coordsList.push(cell)
      } else {
        dict.set(label, [cell])
      }
    }
  }

  const rooms: Room[] = []
  let startIndex = 0

  for (const [label, cells] of dict) {
    const initialValuesInThisRoom = initialValues.filter(iv => cells.some(cell => sameCoords(cell, iv.cell)))
    const room = { label, cells, initialValues: initialValuesInThisRoom, startIndex }
    rooms.push(room)
    startIndex += cells.length
  }

  return rooms
}

const parseInitialValues = (initialValueLines: string[]): InitialValue[] => {
  const rowCount = initialValueLines.length
  const colCount = initialValueLines[0].length
  const initialValues: InitialValue[] = []

  for (const row of range(rowCount)) {
    for (const col of range(colCount)) {
      const value = Number(initialValueLines[row][col])
      if (Number.isInteger(value)) {
        const cell = { row, col }
        const initialValue = { cell, value }
        initialValues.push(initialValue)
      }
    }
  }

  return initialValues
}

export const puzzles = [
  // https://krazydad.com/ripple/sfiles/RIP_CH_8x8_v1_4pp_b1.pdf
  // Challenging Ripple Effect, Volume 1, Book 1
  // Ripple #1
  parsePuzzle(
    "Ripple #1 (8x8)",
    [
      "ABCDDEFF",
      "ABDDGEEH",
      "ABTIGEEH",
      "AAJIGKLH",
      "AMJIIKLL",
      "NMJOPKQL",
      "NMJOPPQL",
      "NNROPPQS"
    ],
    [
      "2----5--",
      "--------",
      "4-------",
      "-5------",
      "------4-",
      "-----2--",
      "--------",
      "--------"
    ]
  ),
  // https://krazydad.com/ripple/sfiles/RIP_CH_8x8_v1_4pp_b1.pdf
  // Challenging Ripple Effect, Volume 1, Book 1
  // Ripple #2
  parsePuzzle(
    "Ripple #2 (8x8)",
    [
      "ABBCCCCD",
      "EEFGHICJ",
      "EFFGIIJJ",
      "EFFKIILL",
      "EMKKNLLL",
      "MMKNNOLP",
      "MMQQOOPP",
      "RQQQOOPP"
    ],
    [
      "------3-",
      "-----5--",
      "-------2",
      "--4-----",
      "5----1--",
      "--------",
      "-1----1-",
      "--------"
    ]
  ),
  // https://krazydad.com/ripple/sfiles/RIP_ST_10x10_v1_4pp_b1.pdf
  // Super-Tough Ripple Effect, Volume 1, Book 1
  // Ripple #1
  parsePuzzle(
    "Ripple #1 (10x10)",
    [
      "ABCCDDDDEE",
      "AFFGGGHDEE",
      "AIFFFJJDKE",
      "ALFMMMNDOO",
      "PLLQRSNNNN",
      "TLLRRRUUUV",
      "TWLXYYYYUV",
      "TZZaaabYUV",
      "TcZZZdbYeV",
      "fcZggggYeh"
    ],
    [
      "----54--1-",
      "---------3",
      "---13-----",
      "----------",
      "-3----4---",
      "----------",
      "------6--4",
      "----------",
      "---2-----3",
      "-----4----"
    ]
  )
]
