import { PathCommands } from "path-commands"

describe("PathCommands tests", () => {

  it("returns correct path data for 3 points", () => {
    const pathCommands = new PathCommands()
    pathCommands.moveTo({ x: 10, y: 20 })
    pathCommands.lineTo({ x: 30, y: 40 })
    pathCommands.lineTo({ x: 50, y: 60 })
    pathCommands.close()
    expect(pathCommands.toPathData()).toBe("M10,20 L30,40 L50,60 Z")
  })
})
