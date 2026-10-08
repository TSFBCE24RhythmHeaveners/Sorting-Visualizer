import type { SortingGenerator } from './types';

const swap = (arr: number[], i: number, j: number) => {
  if (i === j) return;
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
};

function* dualPivotQuickSort(
  items: number[],
  left = 0,
  right = items.length - 1
): SortingGenerator {
  if (left >= right) return;

  let pivotLeft = items[left];
  let pivotRight = items[right];

  if (pivotLeft > pivotRight) {
    swap(items, left, right);
    yield {
      access: [left, right],
      sound: left,
      swaps: 1,
      accesses: 4,
    };
    pivotLeft = items[left];
    pivotRight = items[right];
  } else {
    yield {
      access: [left, right],
      sound: left,
      comparisons: 1,
      accesses: 2,
    };
  }

  let lt = left + 1;
  let i = left + 1;
  let gt = right - 1;

  while (i <= gt) {
    const value = items[i];
    yield {
      access: [i, lt, gt],
      sound: i,
      comparisons: 1,
      accesses: 1,
    };

    if (value < pivotLeft) {
      swap(items, i, lt);
      yield {
        access: [i, lt],
        sound: lt,
        swaps: 1,
        accesses: 4,
      };
      lt++;
      i++;
    } else if (value > pivotRight) {
      while (gt >= i && items[gt] > pivotRight) {
        yield {
          access: [i, gt],
          sound: gt,
          comparisons: 1,
          accesses: 1,
        };
        gt--;
      }

      if (gt >= i && items[gt] < pivotLeft) {
        swap(items, i, lt);
        yield {
          access: [i, lt],
          sound: lt,
          swaps: 1,
          accesses: 4,
        };
        lt++;
      }

      swap(items, i, gt);
      yield {
        access: [i, gt],
        sound: gt,
        swaps: 1,
        accesses: 4,
      };
      gt--;
    } else {
      i++;
    }
  }

  swap(items, left, lt - 1);
  yield {
    access: [left, lt - 1],
    sound: lt - 1,
    swaps: 1,
    accesses: 4,
  };

  swap(items, right, gt + 1);
  yield {
    access: [right, gt + 1],
    sound: gt + 1,
    swaps: 1,
    accesses: 4,
  };

  if (left < lt - 2) {
    yield* dualPivotQuickSort(items, left, lt - 2);
  }
  if (lt <= gt) {
    yield* dualPivotQuickSort(items, lt, gt);
  }
  if (gt + 2 < right) {
    yield* dualPivotQuickSort(items, gt + 2, right);
  }
}

export const dualPivotSort = function* (arr: number[]): SortingGenerator {
  yield* dualPivotQuickSort(arr, 0, arr.length - 1);
};
