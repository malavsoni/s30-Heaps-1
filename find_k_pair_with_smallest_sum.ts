import { Heap } from "./find_k_largest_array";

function kSmallestPairs(
  nums1: number[],
  nums2: number[],
  k: number
): number[][] {
  let heap = new Heap<number[]>(comparision);
  for (let i = 0; i < nums1.length; i++) {
    for (let j = 0; j < nums2.length; j++) {
      heap.insert([nums1[i], nums2[j]]);
      if (heap.size() > k) {
        heap.extractMin();
      }
    }
  }
  let result: number[][] = [];
  while (heap.size() > 0) {
    result.push(heap.extractMin());
  }
  return result;
}

function comparision(a: number[], b: number[]): number {
  return b[0] + b[1] - (a[0] + a[1]);
}

describe("Heap - Find Kth Smallest Pairs", () => {
  it("Happy Path - 01", () => {
    expect(kSmallestPairs([1, 7, 11], [2, 4, 6], 3)).toEqual([
      [1, 4],
      [1, 2],
      [1, 6],
    ]);
  });

  it("Happy Path - 02", () => {
    expect(kSmallestPairs([1, 1, 2], [1, 2, 3], 2)).toEqual([
      [
        [1, 1],
        [1, 1],
      ],
    ]);
  });
});
