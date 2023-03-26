import { PathCommands } from "path-commands";

describe("PathCommands tests", () => {
  it("builds the correct path using individual operations", () => {
    const pathCommands = new PathCommands();
    pathCommands.moveTo({ x: 10, y: 20 });
    pathCommands.lineTo({ x: 30, y: 40 });
    pathCommands.lineTo({ x: 50, y: 60 });
    pathCommands.close();
    expect(pathCommands.toPathData()).toBe("M10,20 L30,40 L50,60 Z");
  });

  it("builds the correct path from a set of points", () => {
    const pathCommands = PathCommands.fromPoints([
      { x: 10, y: 20 },
      { x: 30, y: 40 },
      { x: 50, y: 60 },
    ]);
    expect(pathCommands.toPathData()).toBe("M10,20 L30,40 L50,60 Z");
  });
});
