import type { SortingGenerator } from './types';

export const circleSort = function* (arr: number[]): SortingGenerator {
  let swapped = true;

  while (swapped) {
    swapped = false;

    for (let left = 0, right = arr.length - 1; left < right; left++, right--) {
      if (arr[left] > arr[right]) {
        const tmp = arr[left];
        arr[left] = arr[right];
        arr[right] = tmp;

        swapped = true;
        yield {
          access: [left, right],
          sound: left,
          swaps: 1,
          accesses: 4,
        };
      } else {
        yield {
          access: [left, right],
          sound: right,
          comparisons: 1,
          accesses: 2,
        };
      }
    }
  }
};
