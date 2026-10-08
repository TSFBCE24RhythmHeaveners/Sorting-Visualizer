import type { SortingGenerator } from './types';

const swap = (arr: number[], i: number, j: number) => {
  if (i === j) return;
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
};

export const flagSort = function* (arr: number[]): SortingGenerator {
  if (arr.length < 2) return;

  const min = Math.min(...arr);
  const max = Math.max(...arr);
  const offset = min < 0 ? -min : 0;
  const values = arr.map((value) => value + offset);
  const maxValue = Math.max(...values, 0);

  const passes = Math.max(1, Math.ceil(Math.log2(maxValue + 1) / 8) + 1);

  for (let pass = passes - 1; pass >= 0; pass--) {
    const buckets = new Array(256).fill(0);

    for (let i = 0; i < values.length; i++) {
      const digit = (values[i] >>> (pass * 8)) & 0xff;
      buckets[digit]++;
      yield {
        access: [i],
        sound: i,
        comparisons: 1,
        accesses: 1,
      };
    }

    for (let i = 1; i < buckets.length; i++) {
      buckets[i] += buckets[i - 1];
    }

    const output = new Array(values.length);
    for (let i = values.length - 1; i >= 0; i--) {
      const digit = (values[i] >>> (pass * 8)) & 0xff;
      buckets[digit]--;
      output[buckets[digit]] = values[i];
      yield {
        access: [i],
        sound: i,
        accesses: 2,
      };
    }

    for (let i = 0; i < values.length; i++) {
      values[i] = output[i];
    }
  }

  for (let i = 0; i < arr.length; i++) {
    arr[i] = values[i] - offset;
  }

  for (let i = 0; i < arr.length - 1; i++) {
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
};
