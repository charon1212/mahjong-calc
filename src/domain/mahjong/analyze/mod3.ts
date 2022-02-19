import { tileSortKeys } from "../const";
import { TileSort } from "../type";
import { Mod3Map, Mod3Type, TileSortCount } from "./type";

/**
 * Mod3マップを作成する。
 */
export const createMod3Map = (sortCount: TileSortCount) => {
  const map: Mod3Map = [[], [], []];
  for (let key of tileSortKeys) map[sortCount[key] % 3].push(key);
  return map;
};

/**
 * 14枚の手牌に対するMod3タイプを取得する。
 *
 * @param map Mod3マップ
 * @returns Mod3タイプ
 */
export const getMod3Type = (map: Mod3Map): Mod3Type | undefined => {

  if (map[0].length === 2 && map[1].length === 2 && map[2].length === 0) return '0011';
  if (map[0].length === 3 && map[1].length === 0 && map[2].length === 1) return '0002';
  if (map[0].length === 1 && map[1].length === 1 && map[2].length === 2) return '0122';
  if (map[0].length === 0 && map[1].length === 3 && map[2].length === 1) return '1112';
  if (map[0].length === 0 && map[1].length === 0 && map[2].length === 4) return '2222';
  return undefined;

};

/**
 * テンパイの可能性があるか、mod3の範囲で判定する。
 * テンパイの可能性がある場合、どこを切ると、どこ待ちになるかを返却する。
 */
export const canRest1 = (mod3Type: Mod3Type, m: Mod3Map): { pushSort: TileSort, getSortList: TileSort[] }[] => {

  if (mod3Type === '0011') {
    return [{ pushSort: m[1][0], getSortList: [m[1][1]] }, { pushSort: m[1][1], getSortList: [m[1][0]] },];
  }
  if (mod3Type === '0002') {
    return [
      ...m[0].map((a) => ({ pushSort: a, getSortList: [a, m[2][0]] })), // 0の場所を切り、0 or 2の場所をツモるパターン
      { pushSort: m[2][0], getSortList: [m[2][0]] } // 2の場所を切り、2の場所をツモるパターン
    ];
  }
  if (mod3Type === '0122') {
    return [{ pushSort: m[1][0], getSortList: [m[2][0]] }, { pushSort: m[1][0], getSortList: [m[2][1]] },];
  }
  return [];

};
