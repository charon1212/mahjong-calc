import { breakBlocks } from '../../../../domain/mahjong/analyze/breakBlocks'
import { myAssertEqual } from '../../../util/assert/myAssert';

describe('breakBlocks', () => {
  const data_breakable_noHead = [
    {
      sourceArray: [0, 0, 0, 0, 0, 0, 0, 0, 0,], allowSeries: true, // input
      expectBlocks: [{ head: undefined, series: [], sets: [], }] // expect
    },
    {
      sourceArray: [3, 0, 0, 0, 0, 0, 0,], allowSeries: false, // input
      expectBlocks: [{ head: undefined, series: [], sets: [[1, 1, 1]], }] // expect
    },
    {
      sourceArray: [3, 0, 0, 3, 0, 0, 0,], allowSeries: false, // input
      expectBlocks: [{ head: undefined, series: [], sets: [[1, 1, 1], [4, 4, 4]], }] // expect
    },
    {
      sourceArray: [1, 1, 1, 1, 1, 1, 1, 1, 1], allowSeries: true, // input
      expectBlocks: [{ head: undefined, series: [[1, 2, 3], [4, 5, 6], [7, 8, 9]], sets: [], }] // expect
    },
    {
      sourceArray: [0, 0, 3, 3, 3, 0, 0, 0, 0], allowSeries: true, // input
      expectBlocks: [
        { head: undefined, series: [[3, 4, 5], [3, 4, 5], [3, 4, 5],], sets: [], },
        { head: undefined, series: [], sets: [[3, 3, 3], [4, 4, 4], [5, 5, 5]], },
      ] // expect
    },
    {
      sourceArray: [1, 2, 2, 1, 0, 0, 0, 0, 0], allowSeries: true, // input
      expectBlocks: [{ head: undefined, series: [[1, 2, 3], [2, 3, 4]], sets: [], }] // expect
    },
    {
      sourceArray: [1, 2, 3, 2, 1, 0, 0, 0, 0], allowSeries: true, // input
      expectBlocks: [{ head: undefined, series: [[1, 2, 3], [2, 3, 4], [3, 4, 5]], sets: [], }] // expect
    },
    {
      sourceArray: [1, 2, 3, 3, 2, 1, 0, 0, 0], allowSeries: true, // input
      expectBlocks: [{ head: undefined, series: [[1, 2, 3], [2, 3, 4], [3, 4, 5], [4, 5, 6]], sets: [], }] // expect
    },
  ];
  const data_breakable_withHead = [
    {
      sourceArray: [0, 2, 0, 0, 0, 1, 1, 1, 0], allowSeries: true, // input
      expectBlocks: [{ head: 2, series: [[6, 7, 8]], sets: [], },] // expect
    },
    {
      sourceArray: [2, 2, 2, 2, 2, 2, 2, 0, 0], allowSeries: true, // input
      expectBlocks: [
        { head: 1, series: [[2, 3, 4], [2, 3, 4], [5, 6, 7], [5, 6, 7]], sets: [], },
        { head: 4, series: [[1, 2, 3], [1, 2, 3], [5, 6, 7], [5, 6, 7]], sets: [], },
        { head: 7, series: [[1, 2, 3], [1, 2, 3], [4, 5, 6], [4, 5, 6]], sets: [], },
      ] // expect
    },
    {
      sourceArray: [3, 1, 1, 3, 0, 1, 1, 1, 0], allowSeries: true, // input
      expectBlocks: [
        { head: 1, series: [[1, 2, 3], [6, 7, 8]], sets: [[4, 4, 4]], },
        { head: 4, series: [[2, 3, 4], [6, 7, 8]], sets: [[1, 1, 1]], },
      ] // expect
    },
  ];
  it.each([...data_breakable_noHead, ...data_breakable_withHead])('test', ({ sourceArray, allowSeries, expectBlocks }) => {
    myAssertEqual(breakBlocks(sourceArray, allowSeries), expectBlocks, { ignoreArrayOrder: true });
  });
});
