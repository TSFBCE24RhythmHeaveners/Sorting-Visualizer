import type { SortingGenerator } from './types';

export const dualSelectionSort = function* (arr: number[]): SortingGenerator {
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    let minIndex = left;
    let maxIndex = right;

    for (let i = left; i <= right; i++) {
      if (arr[i] < arr[minIndex]) {
        minIndex = i;
      }
      if (arr[i] > arr[maxIndex]) {
        maxIndex = i;
      }

      yield {
        access: [left, right, i, minIndex, maxIndex],
        sound: i,
        comparisons: 1,
        accesses: 1,
      };
    }

    if (minIndex !== left) {
      const tmp = arr[left];
      arr[left] = arr[minIndex];
      arr[minIndex] = tmp;

      yield {
        access: [left, minIndex],
        sound: left,
        swaps: 1,
        accesses: 4,
      };
    }

    if (maxIndex === left) {
      maxIndex = minIndex;
    }
    if (maxIndex === right) {
      maxIndex = left;
    }

    if (maxIndex !== right) {
      const tmp = arr[right];
      arr[right] = arr[maxIndex];
      arr[maxIndex] = tmp;

      yield {
        access: [right, maxIndex],
        sound: right,
        swaps: 1,
        accesses: 4,
      };
    }

    left++;
    right--;
  }
};
