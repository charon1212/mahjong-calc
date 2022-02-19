import { maxTileLength, tileSortKeys } from "../const";
import { Tile } from "../type";
import { getTileNumList } from "../util";
import { BlockCashBoard } from "./BlockCashBoard";
import { checkRest1, Rest1Expect } from "./rest1";

export type Rest2Expect = { push: Tile, get: { get: Tile, push: Rest1Expect }[] }[];
export const checkRest2 = (cashBoard: BlockCashBoard): Rest2Expect => {

  const result = [] as Rest2Expect;
  for (let pushKey of tileSortKeys) {
    for (let pushNum of getTileNumList(pushKey)) {
      const push: Tile = { n: pushNum, s: pushKey };
      if (cashBoard.get(pushKey)[pushNum - 1] === 0) continue;
      const pushedBoard = cashBoard.clone().operate([{ tile: push, type: 'del' }]);
      const getList = [] as Rest2Expect[0]['get'];
      for (let getKey of tileSortKeys) {
        for (let getNum of getTileNumList(getKey)) {
          const get: Tile = { n: getNum, s: getKey };
          if (pushedBoard.get(getKey)[getNum - 1] === maxTileLength) continue;
          const getBoard = pushedBoard.clone().operate([{ tile: get, type: 'add' }]);
          const rest1Expect = checkRest1(getBoard);
          if (rest1Expect.length > 0) getList.push({ get, push: rest1Expect });
        }
      }
      if (getList.length > 0) result.push({ push, get: getList });
    }
  }
  return result;

};
