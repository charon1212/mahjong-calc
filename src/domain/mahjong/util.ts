import { TileSort } from "./type";

export const getTileNumList = (key: TileSort) => {
  const max = key === 'j' ? 7 : 9; // 字牌は1～7、それ以外は1～9。
  return [...Array(max)].map((_, i) => i + 1);
};
