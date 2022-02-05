import { BoardInfo, Tile, TileSort } from "./type";

const tileSortKeys: TileSort[] = ['m', 'p', 's', 'j',];
export class Board {

  public board: BoardInfo = {
    m: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    p: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    s: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    j: [0, 0, 0, 0, 0, 0, 0],
  };
  constructor() { }
  reset() {
    this.board = {
      m: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      p: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      s: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      j: [0, 0, 0, 0, 0, 0, 0],
    };
  }
  add(tile: Tile) {
    this.board[tile.s][tile.n - 1] += 1;
  }
  delete(tile: Tile) {
    this.board[tile.s][tile.n - 1] -= 1;
  }
  getLength(): number {
    return tileSortKeys
      .map((key) => this.board[key].reduce((p, c) => p + c, 0))
      .reduce((p, c) => p + c, 0);
  }

}
