import { maxTileLength } from "../const";
import { Tile, TileSort } from "../type";
import { getTileNumList } from "../util";
import { BlockCashBoard } from "./BlockCashBoard";
import { canRest1, createMod3Map, getMod3Type } from "./mod3";

export const isRest1 = (cashBoard: BlockCashBoard): { push: Tile, get: Tile[] }[] => {

  const result = [] as { push: Tile, get: Tile[] }[];
  const mod3Map = createMod3Map(cashBoard.getSortCount());
  const mod3Type = getMod3Type(mod3Map);
  if (mod3Type === undefined) return [];
  const pushGetKoho = canRest1(mod3Type, mod3Map);
  for (let { pushSort, getSortList } of pushGetKoho) {
    for (let pushNum of getTileNumList(pushSort)) {
      if (cashBoard.get(pushSort)[pushNum - 1] === 0) continue;
      const push = { s: pushSort, n: pushNum };
      const pushedBoard = cashBoard.clone().operate([{ tile: push, type: 'del' }]);
      const getTileList = [] as Tile[];
      for (let getSort of getSortList) getTileList.push(...createCompletableTileList(pushedBoard, getSort));
      if (getTileList.length > 0) result.push({ push, get: getTileList });
    }
  }
  return result;

};

const createCompletableTileList = (board: BlockCashBoard, key: TileSort) => {
  const result = [] as Tile[];
  for (let n of getTileNumList(key)) {
    if (board.get(key)[n - 1] === maxTileLength) continue;
    const get = { s: key, n };
    const getBoard = board.clone().operate([{ tile: get, type: 'add' }]);
    if (getBoard.isComplete()) result.push(get);
  }
  return result;
};
