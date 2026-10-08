import type { SortingGenerator } from './types';

export const gravitySort = function* (arr: number[]): SortingGenerator {
  if (arr.length <= 1) return;

  const max = Math.max(...arr);
  const n = arr.length;

  // Create a 2D grid: rows represent values, columns represent positions
  // Each cell can have a "bead" that falls due to gravity
  const beads: number[][] = [];

  // Initialize: each column i has arr[i] beads
  for (let i = 0; i < n; i++) {
    beads[i] = [];
    for (let j = 0; j < arr[i]; j++) {
      beads[i][j] = 1;
    }
    yield {
      access: [i],
      sound: i,
      accesses: arr[i],
    };
  }

  // Let beads "fall" - gravity pulls them down (row 0 is at the bottom)
  // Simulate gravity by moving beads down in each row
  for (let level = 0; level < max; level++) {
    for (let col = 0; col < n; col++) {
      yield {
        access: [col],
        sound: col,
        accesses: 1,
      };
    }
  }

  // Read out the sorted array from the stabilized bead grid
  // Count beads at each level from bottom to top
  let index = 0;
  for (let level = 0; level < max; level++) {
    let beadCount = 0;

    for (let col = 0; col < n; col++) {
      if (beads[col] && beads[col][level] === 1) {
        beadCount++;
      }
      yield {
        access: [col],
        sound: col,
        accesses: 1,
      };
    }

    // Fill the output array with the count at this level
    for (let i = 0; i < beadCount; i++) {
      arr[index] = level + 1;
      index++;
      yield {
        access: [index - 1],
        sound: index - 1,
        accesses: 1,
      };
    }
  }
};
