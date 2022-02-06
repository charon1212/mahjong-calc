import { breakBlocks, Blocks } from '../../../../domain/mahjong/analyze/analyze'

const assertBlock = (actual: Blocks, expect: Blocks) => {
  if (actual.head !== expect.head) return false;
  if (actual.series.length !== expect.series.length) return false;
  if (actual.sets.length !== expect.sets.length) return false;
  const actualSeries = [...actual.series.map((v) => [...v])];
  let expectSeries = [...expect.series.map((v) => [...v])];
  for (let a of actualSeries) {
    const id = expectSeries.findIndex((s) => s[0] === a[0] && s[1] === a[1] && s[2] === a[2]);
    if (id === -1) return false;
    expectSeries = expectSeries.filter((_, i) => i !== id);
  }
  const actualSets = [...actual.sets.map((v) => [...v])];
  let expectSets = [...expect.sets.map((v) => [...v])];
  for (let a2 of actualSets) {
    const id = expectSets.findIndex((s) => s[0] === a2[0] && s[1] === a2[1] && s[2] === a2[2]);
    if (id === -1) return false;
    expectSets = expectSets.filter((_, i) => i !== id);
  }
  return true;
};
const assertBlocks = (actual: Blocks[], expect: Blocks[]) => {
  if (actual.length !== expect.length) {
    console.log(`Block length not match. ${JSON.stringify({ actual, expect })}`);
    fail();
  }
  let expect2 = [...expect];
  for (let a of actual) {
    const id = expect2.findIndex((e) => assertBlock(a, e));
    if (id === -1) {
      console.log(`Block not found: ${JSON.stringify({ target: a, actual, expect })}`);
      fail();
    }
    expect2 = expect2.filter((_, i) => i !== id);
  }
};

describe('analyze', () => {
  describe('breakBlocks', () => {
    const data_breakable_noHead = [
      {
        sourceArray: [1, 1, 1, 1, 1, 1, 1, 1, 1], containHead: false, allowSeries: true, // input
        expectBlocks: [{ head: undefined, series: [[1, 2, 3], [4, 5, 6], [7, 8, 9]], sets: [], }] // expect
      },
      {
        sourceArray: [0, 0, 3, 3, 3, 0, 0, 0, 0], containHead: false, allowSeries: true, // input
        expectBlocks: [
          { head: undefined, series: [[3, 4, 5], [3, 4, 5], [3, 4, 5],], sets: [], },
          { head: undefined, series: [], sets: [[3, 3, 3], [4, 4, 4], [5, 5, 5]], },
        ] // expect
      },
      {
        sourceArray: [1, 2, 2, 1, 0, 0, 0, 0, 0], containHead: false, allowSeries: true, // input
        expectBlocks: [{ head: undefined, series: [[1, 2, 3], [2, 3, 4]], sets: [], }] // expect
      },
      {
        sourceArray: [1, 2, 3, 2, 1, 0, 0, 0, 0], containHead: false, allowSeries: true, // input
        expectBlocks: [{ head: undefined, series: [[1, 2, 3], [2, 3, 4], [3, 4, 5]], sets: [], }] // expect
      },
      {
        sourceArray: [1, 2, 3, 3, 2, 1, 0, 0, 0], containHead: false, allowSeries: true, // input
        expectBlocks: [{ head: undefined, series: [[1, 2, 3], [2, 3, 4], [3, 4, 5], [4, 5, 6]], sets: [], }] // expect
      },
    ];
    const data_breakable_withHead = [
      {
        sourceArray: [0, 2, 0, 0, 0, 1, 1, 1, 0], containHead: true, allowSeries: true, // input
        expectBlocks: [{ head: 2, series: [[6, 7, 8]], sets: [], },] // expect
      },
      {
        sourceArray: [2, 2, 2, 2, 2, 2, 2, 0, 0], containHead: true, allowSeries: true, // input
        expectBlocks: [
          { head: 1, series: [[2, 3, 4], [2, 3, 4], [5, 6, 7], [5, 6, 7]], sets: [], },
          { head: 4, series: [[1, 2, 3], [1, 2, 3], [5, 6, 7], [5, 6, 7]], sets: [], },
          { head: 7, series: [[1, 2, 3], [1, 2, 3], [4, 5, 6], [4, 5, 6]], sets: [], },
        ] // expect
      },
      {
        sourceArray: [3, 1, 1, 3, 0, 1, 1, 1, 0], containHead: true, allowSeries: true, // input
        expectBlocks: [
          { head: 1, series: [[1, 2, 3], [6, 7, 8]], sets: [[4, 4, 4]], },
          { head: 4, series: [[2, 3, 4], [6, 7, 8]], sets: [[1, 1, 1]], },
        ] // expect
      },
    ];
    it.each([...data_breakable_noHead, ...data_breakable_withHead])('test', ({ sourceArray, containHead, allowSeries, expectBlocks }) => {
      assertBlocks(breakBlocks(sourceArray, containHead, allowSeries), expectBlocks);
    });
  });
});
