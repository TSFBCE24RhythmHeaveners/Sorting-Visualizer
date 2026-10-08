import type { SortingGenerator } from './types';

export const pigeonholeSort = function* (arr: number[]): SortingGenerator {
  if (arr.length < 2) return;

  const min = Math.min(...arr);
  const max = Math.max(...arr);
  const range = max - min + 1;
  const holes = new Array(range).fill(0);

  for (let i = 0; i < arr.length; i++) {
    const index = arr[i] - min;
    holes[index]++;
    yield {
      access: [i],
      sound: i,
      comparisons: 1,
      accesses: 1,
    };
  }

  let writeIndex = 0;
  for (let value = 0; value < range; value++) {
    while (holes[value] > 0) {
      arr[writeIndex] = value + min;
      holes[value]--;
      yield {
        access: [writeIndex],
        sound: writeIndex,
        accesses: 2,
      };
      writeIndex++;
    }
  }
};
