import { maxTileLength, tileSortKeys } from "../const";
import { Tile } from "../type";
import { getTileNumList } from "../util";
import { BlockCashBoard } from "./BlockCashBoard";
import { checkRest2, Rest2Expect } from "./rest2";

export type Rest3Expect = { push: Tile, get: { get: Tile, push: Rest2Expect }[] }[];
export const checkRest3 = (cashBoard: BlockCashBoard): Rest3Expect => {

  const result = [] as Rest3Expect;
  for (let pushKey of tileSortKeys) {
    for (let pushNum of getTileNumList(pushKey)) {
      const push: Tile = { n: pushNum, s: pushKey };
      if (cashBoard.get(pushKey)[pushNum - 1] === 0) continue;
      const pushedBoard = cashBoard.clone().operate([{ tile: push, type: 'del' }]);
      const getList = [] as Rest3Expect[0]['get'];
      for (let getKey of tileSortKeys) {
        for (let getNum of getTileNumList(getKey)) {
          const get: Tile = { n: getNum, s: getKey };
          if (pushedBoard.get(getKey)[getNum - 1] === maxTileLength) continue;
          const getBoard = pushedBoard.clone().operate([{ tile: get, type: 'add' }]);
          const rest2Expect = checkRest2(getBoard);
          if (rest2Expect.length > 0) getList.push({ get, push: rest2Expect });
        }
      }
      if (getList.length > 0) result.push({ push, get: getList });
    }
  }
  return result;

};
