import { myAssertEqual } from "../../../util/assert/myAssert";
import { analyzeBoard } from '../../../../domain/mahjong/analyze/analyze';

describe('analyze', () => {
  const rest0 = [
    {
      input: { b: { m: [1, 1, 1, 1, 1, 1, 1, 1, 1], p: [0, 0, 0, 2, 0, 0, 0, 0, 0], s: [0, 0, 0, 0, 0, 0, 0, 0, 0], j: [0, 0, 0, 3, 0, 0, 0] } },
      expect: { rest: 0 },
    },
  ];
  it.each([...rest0])('analyze', ({ input, expect }) => {
    myAssertEqual(expect, analyzeBoard(input.b), { ignoreArrayOrder: true });
  })
});
