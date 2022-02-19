import { parseStringToBoard } from '../../../domain/mahjong/Board';
import { myAssertEqual } from '../../util/assert/myAssert';

describe('parseStringToBoard', () => {
  const testData = [
    {
      input: '123456789m456p44j',
      expect: { m: [1, 1, 1, 1, 1, 1, 1, 1, 1], p: [0, 0, 0, 1, 1, 1, 0, 0, 0], s: [0, 0, 0, 0, 0, 0, 0, 0, 0], j: [0, 0, 0, 2, 0, 0, 0] },
    },
  ];
  it.each(testData)('parseStringToBoard', ({ input, expect }) => {
    myAssertEqual(expect, parseStringToBoard(input), { ignoreArrayOrder: false });
  });

});
