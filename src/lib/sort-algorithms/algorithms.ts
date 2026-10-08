import RangeArraySizePowerOfTwo from '../components/RangeArraySizePowerOfTwo.svelte';
import { binaryInsertionSort } from './binary-insertion-sort';
import { bitonicSort } from './bitonic-sort';
import { blockSort } from './block-sort';
import { bogoSort } from './bogo-sort';
import { bubbleSort } from './bubble-sort';
import { bucketSort } from './bucket-sort';
import { circleSort } from './circle-sort';
import { cocktailSort } from './cocktail-sort';
import { combSort } from './comb-sort';
import { countingSort } from './counting-sort';
import { cycleSort } from './cycle-sort';
import { dualPivotSort } from './dual-pivot-sort';
import { dualSelectionSort } from './dual-selection-sort';
import { exchangeSort } from './exchange-sort';
import { flagSort } from './flag-sort';
import { gravitySort } from './gravity-sort';
import { gnomeSort } from './gnome-sort';
import { heapSort } from './heap-sort';
import { insertionSort } from './insertion-sort';
import { introSort } from './intro-sort';
import { mergeSort } from './merge-sort';
import { oddEvenSort } from './odd-even-sort';
import { pancakeSort } from './pancake-sort';
import { pigeonholeSort } from './pigeon-hole-sort';
import { quickSort } from './quick-sort';
import { radixSort } from './radix-sort';
import { radixSortMSD } from './radix-sort-msd';
import { selectionSort } from './selection-sort';
import { shellSort } from './shell-sort';
import { smoothSort } from './smooth-sort';
import { stoogeSort } from './stooge-sort';
import { timSort } from './tim-sort';
import type { AlgorithmDefinition } from './types';

export const algorithms: AlgorithmDefinition[][] = [
  [
    {
      name: 'Bubble Sort',
      function: bubbleSort,
    },
    {
      name: 'Quick Sort',
      function: quickSort,
      badge: 'Middle Pivot',
    },
    {
      name: 'Quick Sort',
      function: dualPivotSort,
      badge: 'Dual Pivot',
    },
    {
      name: 'Shell Sort',
      function: shellSort,
    },
    {
      name: 'Merge Sort',
      function: mergeSort,
    },
    {
      name: 'Insertion Sort',
      function: insertionSort,
    },
    {
      name: 'Selection Sort',
      function: selectionSort,
    },
    {
      name: 'Radix Sort',
      function: radixSort,
      badge: 'LSD',
    },
    {
      name: 'Radix Sort',
      function: radixSortMSD,
      badge: 'MSD',
    },
    {
      name: 'Heap Sort',
      function: heapSort,
    },
    {
      name: 'Tim Sort',
      function: timSort,
    },
    {
      name: 'Gnome Sort',
      function: gnomeSort,
    },
    {
      name: 'Cycle Sort',
      function: cycleSort,
    },
    {
      name: 'Cocktail Sort',
      function: cocktailSort,
    },
    {
      name: 'Pancake Sort',
      function: pancakeSort,
    },
  ],
  [
    {
      name: 'Stooge Sort',
      function: stoogeSort,
    },
    {
      name: 'Bogo Sort',
      function: bogoSort,
    },
    {
      name: 'Exchange Sort',
      function: exchangeSort,
    },
    {
      name: 'Bitonic Sort',
      function: bitonicSort,
      arraySizeComponent: RangeArraySizePowerOfTwo,
    },
    {
      name: 'Odd Even Sort',
      function: oddEvenSort,
    },
    {
      name: 'Counting Sort',
      function: countingSort,
    },
    {
      name: 'Comb Sort',
      function: combSort,
    },
    {
      name: 'Intro Sort',
      function: introSort,
    },
    {
      name: 'Smooth Sort',
      function: smoothSort,
    },
    {
      name: 'Bucket Sort',
      function: bucketSort,
    },
    {
      name: 'Flag Sort',
      function: flagSort,
    },
    {
      name: 'Pigeonhole Sort',
      function: pigeonholeSort,
    },
    {
      name: 'Selection Sort',
      function: dualSelectionSort,
      badge: 'Two-Way',
    },
    {
      name: 'Block Merge Sort',
      function: blockSort,
    },
  ],
  [
    {
      name: 'Insertion Sort',
      function: binaryInsertionSort,
      badge: 'Binary',
    },
    {
      name: 'Circle Sort',
      function: circleSort,
    },
    {
      name: 'Bead Sort',
      function: gravitySort,
    },
  ]
];
