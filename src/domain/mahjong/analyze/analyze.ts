import { BoardInfo, Tile } from "../type";
import { BlockCashBoard } from "./BlockCashBoard";
import { checkRest1, Rest1Expect } from "./rest1";
import { checkRest2, Rest2Expect } from "./rest2";
import { checkRest3, Rest3Expect } from "./rest3";

export type AnalyzeResult =
  { rest: 0 } | // rest0は、アガリ
  { rest: 1, expect: Rest1Expect } | // rest1は、テンパイ
  { rest: 2, expect: Rest2Expect } | // rest2は、1シャンテン
  { rest: 3, expect: Rest3Expect } | // rest3は、2シャンテン
  undefined;

export const analyzeBoard = (b: BoardInfo): AnalyzeResult => {

  const cashBoard = new BlockCashBoard(b);
  if (cashBoard.isComplete()) return { rest: 0 };
  const rest1 = checkRest1(cashBoard);
  if (rest1.length > 0) {
    return { rest: 1, expect: rest1 };
  }
  const rest2 = checkRest2(cashBoard);
  if (rest2.length > 0) {
    return { rest: 2, expect: rest2 };
  }
  const rest3 = checkRest3(cashBoard);
  if (rest3.length > 0) {
    return { rest: 3, expect: rest3 };
  }
  return undefined;

};
