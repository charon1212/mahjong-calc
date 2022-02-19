import { myAssertEqual } from "../../../util/assert/myAssert";
import { analyzeBoard } from '../../../../domain/mahjong/analyze/analyze';
import { parseStringToBoard } from '../../../../domain/mahjong/Board';

describe('analyze', () => {
  const rest0 = [
    {
      input: { boardStr: '123456789m456p44j' },
      expect: { rest: 0 },
    },
  ];
  it.each([...rest0])('analyze', ({ input, expect }) => {
    const b = parseStringToBoard(input.boardStr);
    myAssertEqual(expect, analyzeBoard(b), { ignoreArrayOrder: true });
  })
});
