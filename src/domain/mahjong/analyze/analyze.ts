import { BoardInfo, Tile } from "../type";
import { BlockCashBoard } from "./BlockCashBoard";
import { isRest1 } from "./rest1";

export type AnalyzeResult = {
  rest: number, // 後何個の牌で上がれるか。アガリは0、テンパイは1、1シャンテンは2、2シャンテンは3、...
  set?: { push: Tile, get: Tile }[],
};

export const analyzeBoard = (b: BoardInfo): AnalyzeResult => {

  const cashBoard = new BlockCashBoard(b);
  if (cashBoard.isComplete()) return { rest: 0 };
  const rest1 = isRest1(cashBoard);
  if (rest1.length > 0) {
    return { rest: 1, set: rest1 };
  }
  return { rest: - 1 };

};
