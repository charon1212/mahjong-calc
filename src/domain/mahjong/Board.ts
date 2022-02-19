import { maxBoardLength, maxTileLength, tileSortKeys } from "./const";
import { BoardInfo, Tile, TileSort } from "./type";

export const cloneBoard = (board: BoardInfo) => {
  return JSON.parse(JSON.stringify(board)) as BoardInfo;
};
export const addTile = (board: BoardInfo, tile: Tile) => {
  if (getBoardLength(board) < maxBoardLength) board[tile.s][tile.n - 1] = Math.min(maxTileLength, board[tile.s][tile.n - 1] + 1);
  return board;
};
export const deleteTile = (board: BoardInfo, tile: Tile) => {
  board[tile.s][tile.n - 1] = Math.max(0, board[tile.s][tile.n - 1] - 1);
  return board;
};
export const getInitialBoard = (): BoardInfo => ({
  m: [0, 0, 0, 0, 0, 0, 0, 0, 0],
  p: [0, 0, 0, 0, 0, 0, 0, 0, 0],
  s: [0, 0, 0, 0, 0, 0, 0, 0, 0],
  j: [0, 0, 0, 0, 0, 0, 0],
});
export const getBoardLength = (board: BoardInfo) => {
  return tileSortKeys
    .map((key) => board[key].reduce((p, c) => p + c, 0))
    .reduce((p, c) => p + c, 0);
};

export const parseStringToBoard = (str: string): BoardInfo => {
  const b: BoardInfo = { m: [0, 0, 0, 0, 0, 0, 0, 0, 0], p: [0, 0, 0, 0, 0, 0, 0, 0, 0], s: [0, 0, 0, 0, 0, 0, 0, 0, 0], j: [0, 0, 0, 0, 0, 0, 0], };
  let cash = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  for (let i = 0; i < str.length; i++) {
    const c = str[i];
    if (/[1-9]/.test(c)) {
      cash[+c - 1]++;
    } else {
      const key = getTileSortKey(c);
      if (key) {
        for (let i = 0; i < b[key].length; i++) b[key][i] += cash[i];
        cash = [0, 0, 0, 0, 0, 0, 0, 0, 0];
      }
    }
  }
  return b;
};
const getTileSortKey = (c: string): TileSort | undefined => {
  if (c === 'm') return 'm';
  if (c === 'p') return 'p';
  if (c === 's') return 's';
  if (c === 'j') return 'j';
  return undefined;
};
