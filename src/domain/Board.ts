import { BoardInfo, Tile } from "./type";

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

}
