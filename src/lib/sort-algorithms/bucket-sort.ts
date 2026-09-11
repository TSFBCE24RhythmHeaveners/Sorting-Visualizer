import type { SortingGenerator } from './types';

/**
 * Bucket Sort Algorithm
 *
 * A distribution sort that divides the input into a number of buckets,
 * sorts each bucket individually (using insertion sort), and then
 * concatenates them back into the original array.
 *
 * Time Complexity: O(n + k) average, O(n²) worst case
 * Space Complexity: O(n + k)
 *
 * @param arr - Array of numbers to sort
 * @yields ProgressIndicator - Visualization data for each step
 */
export const bucketSort = function* (arr: number[]): SortingGenerator {
  const n = arr.length;
  if (n <= 1) return;

  // Find max value
  let maxVal = arr[0];
  for (let i = 1; i < n; i++) {
    yield { access: [i], sound: i, comparisons: 1, dataAccesses: 2 };
    if (arr[i] > maxVal) maxVal = arr[i];
  }

  // Number of buckets
  const bucketCount = Math.max(1, Math.floor(Math.sqrt(n)));
  const buckets: number[][] = Array.from({ length: bucketCount }, () => []);

  // Distribute elements into buckets
  for (let i = 0; i < n; i++) {
    const bucketIndex = Math.min(
      Math.floor((arr[i] / (maxVal + 1)) * bucketCount),
      bucketCount - 1
    );
    buckets[bucketIndex].push(arr[i]);
    yield { access: [i], sound: i, comparisons: 0, dataAccesses: 1 };
  }

  // Sort each bucket with insertion sort and gather back
  let pos = 0;
  for (let b = 0; b < bucketCount; b++) {
    const bucket = buckets[b];

    // Insertion sort within bucket — yield for each comparison/shift
    for (let i = 1; i < bucket.length; i++) {
      const key = bucket[i];
      let j = i - 1;
      // We track the bucket's position in the overall array as pos + i
      while (j >= 0 && bucket[j] > key) {
        yield { access: [pos + j, pos + j + 1], sound: pos + j + 1, comparisons: 1, dataAccesses: 3 };
        bucket[j + 1] = bucket[j];
        j--;
      }
      bucket[j + 1] = key;
    }

    // Place sorted bucket elements back into arr
    for (let i = 0; i < bucket.length; i++) {
      arr[pos] = bucket[i];
      yield { access: [pos], sound: pos, comparisons: 0, dataAccesses: 1 };
      pos++;
    }
  }
};
