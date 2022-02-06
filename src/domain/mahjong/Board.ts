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
