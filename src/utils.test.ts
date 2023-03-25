import * as U from "utils"

describe("utils tests", () => {

  describe("range tests", () => {
    it("returns correct range of values", () => {
      expect(U.range(3)).toEqual([0, 1, 2])
    })
  })

  describe("sum tests", () => {
    it("returns correct sum", () => {
      expect(U.sum([1, 2, 3])).toBe(6)
    })
  })

  describe("min tests", () => {
    it("returns correct min value", () => {
      expect(U.min([10, 3, 45])).toBe(3)
    })
  })

  describe("max tests", () => {
    it("returns correct max value", () => {
      expect(U.max([10, 3, 45])).toBe(45)
    })
  })

  describe("minBy tests", () => {
    it("returns correct minBy value", () => {
      const obj1 = { name: "obj1", value: 10 }
      const obj2 = { name: "obj2", value: 3 }
      const obj3 = { name: "obj3", value: 45 }
      expect(U.minBy([obj1, obj2, obj3], item => item.value)).toBe(3)
    })
  })

  describe("maxBy tests", () => {
    it("returns correct maxBy value", () => {
      const obj1 = { name: "obj1", value: 10 }
      const obj2 = { name: "obj2", value: 3 }
      const obj3 = { name: "obj3", value: 45 }
      expect(U.maxBy([obj1, obj2, obj3], item => item.value)).toBe(45)
    })
  })

  describe("first tests", () => {
    it("returns correct first value", () => {
      expect(U.first([10, 3, 45])).toBe(10)
    })
  })

  describe("last tests", () => {
    it("returns correct last value", () => {
      expect(U.last([10, 3, 45])).toBe(45)
    })
  })

  describe("distinct tests", () => {
    it("returns correct distinct array (numbers)", () => {
      expect(U.distinct([1, 2, 1, 3, 4, 3, 5, 6])).toEqual([1, 2, 3, 4, 5, 6])
    })

    it("returns correct distinct array (strings)", () => {
      expect(U.distinct(["a", "b", "a", "c", "d", "c", "e", "f"])).toEqual(["a", "b", "c", "d", "e", "f"])
    })
  })

  describe("except tests", () => {
    it("returns values in the first array that are not in the second array", () => {
      const xs = [1, 2, 3, 4, 5]
      const ys = [3, 4, 5, 6, 7]
      expect(U.except(xs, ys)).toEqual([1, 2])
    })
  })

  describe("union tests", () => {
    it("returns values that are in either array but without any duplicates", () => {
      const xs = [1, 2, 3, 4, 5]
      const ys = [3, 4, 5, 6, 7]
      expect(U.union(xs, ys)).toEqual([1, 2, 3, 4, 5, 6, 7])
    })
  })

  describe("intersect tests", () => {
    it("returns only values that are in both arrays", () => {
      const xs = [1, 2, 3, 4, 5]
      const ys = [3, 4, 5, 6, 7]
      expect(U.intersect(xs, ys)).toEqual([3, 4, 5])
    })
  })

  describe("reverseString tests", () => {
    it("returns correctly reversed string", () => {
      expect(U.reverseString("test")).toBe("tset")
    })
  })
})
