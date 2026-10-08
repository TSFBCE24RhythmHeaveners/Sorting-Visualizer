import type { SortingGenerator } from './types';

// Leonardo numbers: L(n) = L(n-1) + L(n-2) + 1
// Sequence: 1, 3, 5, 11, 21, 43, 85, ...
function generateLeonardoNumbers(maxLength: number): number[] {
  const leonardo = [1, 3];
  while (leonardo[leonardo.length - 1] < maxLength) {
    leonardo.push(
      leonardo[leonardo.length - 1] +
        leonardo[leonardo.length - 2] +
        1
    );
  }
  return leonardo;
}

function* siftDown(
  arr: number[],
  pos: number,
  leonardoIndex: number,
  leonardo: number[]
): SortingGenerator {
  const value = arr[pos];
  const leonardoNum = leonardo[leonardoIndex];

  while (leonardoIndex > 1) {
    const leftChild = pos - leonardo[leonardoIndex - 1];
    const rightChild = pos - leonardo[leonardoIndex - 2];
    let largest = pos;
    let largestChild = -1;

    if (
      rightChild >= 0 &&
      arr[rightChild] > arr[largest]
    ) {
      largest = rightChild;
      largestChild = leonardoIndex - 2;
    }

    if (arr[leftChild] > arr[largest]) {
      largest = leftChild;
      largestChild = leonardoIndex - 1;
    }

    yield {
      access: [pos, leftChild, rightChild],
      sound: largest,
      comparisons: 2,
      accesses: 3,
    };

    if (largest === pos) break;

    const tmp = arr[pos];
    arr[pos] = arr[largest];
    arr[largest] = tmp;

    yield {
      access: [pos, largest],
      sound: largest,
      swaps: 1,
      accesses: 4,
    };

    pos = largest;
    leonardoIndex = largestChild || leonardoIndex - 1;
  }
}

export const smoothSort = function* (arr: number[]): SortingGenerator {
  if (arr.length <= 1) return;

  const leonardo = generateLeonardoNumbers(arr.length);
  const trees: number[] = [];
  let leonardoHeaps: number[] = [];

  // Build heaps using Leonardo sequence
  for (let i = 0; i < arr.length; ) {
    let leonardoIndex = 0;

    if (leonardoHeaps.length > 0) {
      leonardoIndex = leonardoHeaps[leonardoHeaps.length - 1];
      if (leonardo[leonardoIndex] <= arr.length - i) {
        if (leonardoHeaps.length > 1) {
          const prevIndex = leonardoHeaps[leonardoHeaps.length - 2];
          if (
            prevIndex === leonardoIndex - 1 &&
            leonardo[leonardoIndex] <= arr.length - i
          ) {
            leonardoHeaps.pop();
            leonardoHeaps.pop();
            leonardoHeaps.push(leonardoIndex + 1);
            leonardoIndex = leonardoIndex + 1;
          }
        }
      }
    }

    leonardoHeaps.push(leonardoIndex);
    trees.push(i);
    i += leonardo[leonardoIndex];
  }

  // Sift down to heapify
  for (let i = trees.length - 1; i >= 0; i--) {
    yield* siftDown(
      arr,
      trees[i],
      leonardoHeaps[i],
      leonardo
    );
  }

  // Extract heap roots and restore heap property
  for (let i = arr.length - 1; i > 0; i--) {
    const tmp = arr[0];
    arr[0] = arr[i];
    arr[i] = tmp;

    yield {
      access: [0, i],
      sound: i,
      swaps: 1,
      accesses: 4,
    };

    leonardoHeaps.pop();
    if (leonardoHeaps.length > 0) {
      const rootIndex = trees[trees.length - leonardoHeaps.length];
      yield* siftDown(
        arr,
        rootIndex,
        leonardoHeaps[leonardoHeaps.length - 1],
        leonardo
      );
    }
    trees.pop();
  }
};
