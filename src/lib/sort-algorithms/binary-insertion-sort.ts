import type { SortingGenerator } from './types';

export const binaryInsertionSort = function* (arr: number[]): SortingGenerator {
  for (let i = 1; i < arr.length; i++) {
    const value = arr[i];
    let left = 0;
    let right = i;

    while (left < right) {
      const mid = Math.floor((left + right) / 2);

      if (arr[mid] > value) {
        right = mid;
      } else {
        left = mid + 1;
      }

      yield {
        access: [i, mid, left, right],
        sound: mid,
        comparisons: 1,
        accesses: 1,
      };
    }

    if (left !== i) {
      for (let j = i; j > left; j--) {
        arr[j] = arr[j - 1];
        yield {
          access: [j, j - 1],
          sound: j,
          accesses: 2,
        };
      }

      arr[left] = value;
      yield {
        access: [left, i],
        sound: left,
        accesses: 2,
      };
    }
  }
};
