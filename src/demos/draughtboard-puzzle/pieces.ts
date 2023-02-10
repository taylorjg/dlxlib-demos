import { Piece } from "./piece"

const piecesMap = new Map<string, string[]>([
  [
    "A",
    [
      "B ",
      "WB",
      "B ",
      "W "
    ]
  ],
  [
    "B",
    [
      "B  ",
      "WBW"
    ],
  ],
  [
    "C",
    [
      "W ",
      "BW"
    ]
  ],
  [
    "D",
    [
      " WB",
      " B ",
      "BW "
    ]
  ],
  [
    "E",
    [
      "W ",
      "BW",
      " B",
      " W"
    ]
  ],
  [
    "F",
    [
      "WB ",
      " W ",
      " BW"
    ]
  ],
  [
    "G",
    [
      "WB ",
      " WB"
    ]
  ],
  [
    "H",
    [
      "B ",
      "WB",
      "B "
    ]
  ],
  [
    "I",
    [
      "B ",
      "W ",
      "BW",
      "W "
    ]
  ],
  [
    "J",
    [
      " B",
      " W",
      " B",
      "BW"
    ]
  ],
  [
    "K",
    [
      "  W",
      " WB",
      "WB "
    ]
  ],
  [
    "L",
    [
      "B ",
      "W ",
      "BW"
    ]
  ],
  [
    "M",
    [
      " B",
      " W",
      "WB",
      "B "
    ]
  ],
  [
    "N",
    [
      "W ",
      "B ",
      "W ",
      "BW"
    ]
  ]
])

export const pieces: Piece[] =
  Array.from(piecesMap)
    .map(([label, pattern]) => ({ label, pattern }))
