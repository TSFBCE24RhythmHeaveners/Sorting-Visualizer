import type { SortingGenerator } from './types';

export const sleepSort = function* (arr: number[]): SortingGenerator {
  const context = {
    updateBars: (b: any) => {},
    isStopped: () => false,
    delayValue: () => 1,
  };

  const sorted: number[] = [];
  const delays = arr.map((val, idx) => ({ value: val, index: idx, delay: val }));

  // Create an array to track which elements have been placed
  const placed = new Array(arr.length).fill(false);
  let placedCount = 0;

  // Sort by delay and process them in order
  delays.sort((a, b) => a.delay - b.delay);

  for (let round = 0; round < arr.length; round++) {
    // In each round, elements "wait" for their delay time
    // We simulate this by checking if the current element's delay has "passed"
    for (let i = 0; i < arr.length; i++) {
      if (!placed[i]) {
        const element = delays.find((d) => d.index === i);
        if (element && round * 100 >= element.delay * 10) {
          // Check if this element should be added now
          // Count how many with smaller delays have been placed
          const smallerCount = delays.filter(
            (d) => d.delay < element.delay || (d.delay === element.delay && d.index < i)
          ).length;

          if (smallerCount === placedCount) {
            placed[i] = true;
            placedCount++;

            // Mark the sorted position
            sorted.push(arr[i]);

            // Update array to show sorted elements
            const updatedArr = [...arr];
            for (let j = 0; j < sorted.length; j++) {
              updatedArr[j] = sorted[j];
            }

            yield {
              access: [i],
              sound: arr[i],
              comparisons: 0,
              swaps: 0,
              accesses: 1,
            };
          }
        }
      }
    }

    if (placedCount === arr.length) break;
  }

  // If there are still unplaced elements (rare due to inconsistencies), 
  // repeat with longer waiting times
  if (placedCount < arr.length) {
    for (let retryRound = 0; retryRound < 5; retryRound++) {
      for (let i = 0; i < arr.length; i++) {
        if (!placed[i]) {
          placed[i] = true;
          placedCount++;
          sorted.push(arr[i]);

          yield {
            access: [i],
            sound: arr[i],
            comparisons: 0,
            swaps: 0,
            accesses: 1,
          };

          if (placedCount === arr.length) return;
        }
      }
    }
  }
};
