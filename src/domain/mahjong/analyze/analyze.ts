import { BoardInfo, Tile } from "../type";
import { BlockCashBoard } from "./BlockCashBoard";
import { checkRest1, Rest1Expect } from "./rest1";

export type AnalyzeResult =
  { rest: 0 } | // rest0は、アガリ
  { rest: 1, expect: Rest1Expect } | // rest1は、テンパイ
  { rest: 2, expect: Rest2Expect } | // rest2は、1シャンテン
  { rest: 3, expect: Rest3Expect } | // rest3は、2シャンテン
  undefined;
export type Rest2Expect = { push: Tile, get: { get: Tile, push: Rest1Expect }[] }[];
export type Rest3Expect = { push: Tile, get: { get: Tile, push: Rest2Expect }[] }[];

export const analyzeBoard = (b: BoardInfo): AnalyzeResult => {

  const cashBoard = new BlockCashBoard(b);
  if (cashBoard.isComplete()) return { rest: 0 };
  const rest1 = checkRest1(cashBoard);
  if (rest1.length > 0) {
    return { rest: 1, expect: rest1 };
  }
  return undefined;

};
