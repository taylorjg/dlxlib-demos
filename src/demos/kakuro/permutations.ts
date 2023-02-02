// https://www.chadgolden.com/blog/finding-all-the-permutations-of-an-array-in-c-sharp

export const doPermute = (nums: number[]): number[][] => {
  const permutations: number[][] = []
  doPermuteInternal(nums, 0, nums.length - 1, permutations)
  return permutations
}

const doPermuteInternal = (nums: number[], start: number, end: number, list: number[][]): void => {
  if (start === end) {
    list.push(nums.slice())
  } else {
    for (let i = start; i <= end; i++) {
      swap(nums, start, i)
      doPermuteInternal(nums, start + 1, end, list)
      swap(nums, start, i)
    }
  }
}

const swap = (nums: number[], index1: number, index2: number): void => {
  const temp = nums[index1]
  nums[index1] = nums[index2]
  nums[index2] = temp
}
