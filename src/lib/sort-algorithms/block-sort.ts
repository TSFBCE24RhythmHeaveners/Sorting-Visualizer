import type { SortingGenerator } from './types';

const swap = (arr: number[], i: number, j: number) => {
  if (i === j) return;
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
};

const mergeBlocks = function* (
  arr: number[],
  left: number,
  middle: number,
  right: number
): SortingGenerator {
  const leftPart = arr.slice(left, middle + 1);
  const rightPart = arr.slice(middle + 1, right + 1);

  let i = 0;
  let j = 0;
  let index = left;

  while (i < leftPart.length && j < rightPart.length) {
    yield {
      access: [left + i, middle + 1 + j],
      sound: left + i,
      comparisons: 1,
      accesses: 2,
    };

    if (leftPart[i] <= rightPart[j]) {
      arr[index] = leftPart[i];
      i++;
    } else {
      arr[index] = rightPart[j];
      j++;
    }
    yield {
      access: [index],
      sound: index,
      accesses: 2,
    };
    index++;
  }

  while (i < leftPart.length) {
    arr[index] = leftPart[i];
    yield {
      access: [index],
      sound: index,
      accesses: 2,
    };
    i++;
    index++;
  }

  while (j < rightPart.length) {
    arr[index] = rightPart[j];
    yield {
      access: [index],
      sound: index,
      accesses: 2,
    };
    j++;
    index++;
  }
};

export const blockSort = function* (arr: number[]): SortingGenerator {
  const n = arr.length;
  if (n < 2) return;

  for (let i = 0; i + 1 < n; i += 2) {
    yield {
      access: [i, i + 1],
      sound: i,
      comparisons: 1,
      accesses: 2,
    };

    if (arr[i] > arr[i + 1]) {
      swap(arr, i, i + 1);
      yield {
        access: [i, i + 1],
        sound: i,
        swaps: 1,
        accesses: 4,
      };
    }
  }

  for (let blockSize = 2; blockSize < n; blockSize *= 2) {
    for (let start = 0; start < n; start += blockSize * 2) {
      const middle = Math.min(start + blockSize - 1, n - 1);
      const end = Math.min(start + blockSize * 2 - 1, n - 1);

      if (middle >= end) continue;
      yield* mergeBlocks(arr, start, middle, end);
    }
  }
};
