export class Heap<T> {
  private numbers: T[];
  private comparator: (a: T, b: T) => number;

  constructor(comparator: (a: T, b: T) => number) {
    this.comparator = comparator;
    this.numbers = [];
  }

  public insert(object: T) {
    this.numbers.push(object);

    let index = this.numbers.length - 1;
    while (index > 0) {
      let parent = Math.floor((index - 1) / 2);
      let comparision: number = this.comparator(
        this.numbers[parent],
        this.numbers[index]
      );
      if (comparision >= 0) {
        this.swap(parent, index);
        index = parent;
      } else {
        break;
      }
    }
  }

  public extractMin(): T {
    return this.extractAtIndex(0);
  }

  public extractAtIndex(index: number): T {
    let result = this.numbers[index];
    this.swap(0, this.numbers.length - 1);
    this.numbers.pop();

    while (index < this.numbers.length) {
      let left = this.leftChildIndex(index);
      let right = this.rightChildIndex(index);

      let smaller = left;
      if (
        right < this.numbers.length &&
        this.comparator(this.numbers[smaller], this.numbers[right]) > 0
      ) {
        smaller = right;
      }

      if (
        smaller < this.numbers.length &&
        this.comparator(this.numbers[smaller], this.numbers[index]) >= 0
      ) {
        this.swap(index, smaller);
        index = smaller;
      } else {
        break;
      }
    }

    return result;
  }

  public peek(): T | null {
    return this.numbers.length > 0 ? this.numbers[0] : null;
  }

  public size(): number {
    return this.numbers.length;
  }

  private parentIndex(index: number): number {
    return Math.floor((index - 1) / 2);
  }

  private leftChildIndex(index: number): number {
    return 2 * index + 1;
  }

  private rightChildIndex(index: number): number {
    return 2 * index + 2;
  }

  private swap(first: number, second: number) {
    let temp = this.numbers[first];
    this.numbers[first] = this.numbers[second];
    this.numbers[second] = temp;
  }
}

function findKthLargest(nums: number[], k: number): number {
  let heap = new Heap<number>((a, b) => a - b);
  for (let index = 0; index < nums.length; index++) {
    heap.insert(nums[index]);
    if (heap.size() > k) {
      if (index == 7) {
        console.log("HI");
      }
      heap.extractMin();
    }
  }
  return heap.peek()!;
}

function findKthLargest_with_max_heap(nums: number[], k: number): number {
  let heap = new Heap<number>((a, b) => b - a);
  let result: number = Number.MIN_SAFE_INTEGER;
  for (let index = 0; index < nums.length; index++) {
    heap.insert(nums[index]);
    if (heap.size() > nums.length - k + 1) {
      result = Math.min(result, heap.extractMin());
    }
  }
  return heap.peek()!;
}

describe("Heap - Find Kth Largest Element", () => {
  it("Happy Path - 01", () => {
    expect(findKthLargest([3, 2, 1, 5, 6, 4], 2)).toEqual(5);
  });

  it("Happy Path - 01 - Duplicates", () => {
    expect(findKthLargest([3, 2, 1, 5, 6, 4], 2)).toEqual(5);
  });

  it("Happy Path - 01 - Duplicates", () => {
    expect(findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4)).toEqual(4);
  });

  it("Happy Path - 01 - Max Heap", () => {
    expect(findKthLargest_with_max_heap([3, 2, 1, 5, 5, 5, 6, 4], 2)).toEqual(
      5
    );
  });

  it("Happy Path - 01 - Max Heap", () => {
    expect(findKthLargest_with_max_heap([3, 2, 1, 5, 6, 4], 2)).toEqual(5);
  });
});
