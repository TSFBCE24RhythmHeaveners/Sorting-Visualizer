import type { SortingGenerator } from './types';

export const sleepSort = function* (arr: number[]): SortingGenerator {
  const sorted: number[] = [];
  
  // Create array of {value, originalIndex} pairs with their "wake times"
  const elements = arr.map((value, index) => ({
    value,
    index,
    wakeTime: value, // simulate sleep duration proportional to value
  }));

  // Sort by wake time to process in order they would "wake up"
  const sorted_elements = [...elements].sort((a, b) => a.wakeTime - b.wakeTime);

  // Process elements in order of their wake times (smallest first)
  for (const element of sorted_elements) {
    sorted.push(element.value);

    yield {
      access: [element.index],
      sound: element.value,
      comparisons: 0,
      swaps: 0,
      accesses: 1,
    };
  }
};
