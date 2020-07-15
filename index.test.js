const { createGraph } = require("./index");

describe("createGraph", () => {
  test("returns an object", () => {
    expect(typeof createGraph([])).toBe("object");
  });
});
