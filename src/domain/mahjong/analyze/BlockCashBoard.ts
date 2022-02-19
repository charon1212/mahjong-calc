import { maxTileLength, tileSortKeys } from "../const";
import { BoardInfo, Tile, TileSort } from "../type";
import { breakBlocks } from "./breakBlocks";
import { createMod3Map, getMod3Type } from "./mod3";
import { Blocks, Mod3Map, TileSortCount } from "./type";

export class BlockCashBoard {

  /** ■■■■キャッシュ■■■■ */
  // 牌種ごとのカウンター
  private sortCount: TileSortCount;
  public getSortCount = () => this.sortCount;
  // 全体のカウンター
  private totalCount: number;
  public getTotalCount = () => this.totalCount;
  // 牌種ごとのブロック構成
  private blocks: Partial<{ [key in TileSort]: Blocks[] }> = {};
  public getBlockCash = () => this.blocks;
  private getCashBlocks(key: TileSort): Blocks[] {
    const cash = this.blocks[key];
    if (cash === undefined) return this.registerBlocks(key);
    return cash;
  };
  private registerBlocks(key: TileSort): Blocks[] {
    if (this.sortCount[key] === 0) return this.blocks[key] = [{ head: undefined, series: [], sets: [] }];
    const mod3 = this.sortCount[key] % 3;
    if (mod3 === 1) return this.blocks[key] = [];
    return this.blocks[key] = breakBlocks(this.b[key], key !== 'j');
  }

  /**
   * コンストラクター
   */
  private b: BoardInfo;
  public getBoard = () => this.b;
  public get = (key: TileSort) => this.b[key];
  constructor(b: BoardInfo, cash?: { totalCount: number, sortCount: TileSortCount }) {
    this.b = JSON.parse(JSON.stringify(b));
    if (cash) {
      this.totalCount = cash.totalCount;
      this.sortCount = cash.sortCount;
    } else {
      const f = (key: TileSort) => b[key].reduce((p, c) => p + c, 0);
      this.sortCount = { m: f('m'), p: f('p'), s: f('s'), j: f('j'), };
      this.totalCount = tileSortKeys.map((key) => this.sortCount[key]).reduce((p, c) => p + c, 0);
    }
  }

  /**
   * 手牌に対する操作。牌の追加や削除を行う。
   */
  operate(param: { tile: Tile, type: 'add' | 'del' }[]) {
    let varTotal = 0;
    const varSort: { [key in TileSort]: number } = { m: 0, p: 0, s: 0, j: 0 };
    for (let { tile, type } of param) {
      const { n, s } = tile;
      if (type === 'add') {
        if (this.b[s][n - 1] >= maxTileLength) throw new Error(`既に${maxTileLength}以上の牌を持っています。`);
        this.b[s][n - 1]++;
        varTotal++;
        varSort[s]++;
      } else {
        if (this.b[s][n - 1] <= 0) throw new Error(`削除する牌がありません。`);
        this.b[s][n - 1]--;
        varTotal--;
        varSort[s]--;
      }
    }
    this.totalCount += varTotal;
    tileSortKeys.forEach((key) => {
      if (varSort[key] !== 0) {
        this.sortCount[key] += varSort[key];
        this.blocks[key] = undefined;
      }
    });
    return this;
  }

  /**
   * インスタンスのコピーを作成する。
   */
  clone() {
    const newBlockCashBoard = new BlockCashBoard(this.b, { totalCount: this.totalCount, sortCount: { ...this.sortCount } });
    newBlockCashBoard.blocks = JSON.parse(JSON.stringify(this.blocks));
    return newBlockCashBoard;
  }

  /**
   * アガリを判定する。
   */
  isComplete(): boolean {
    if (this.totalCount !== 14) return false;
    const mod3Type = getMod3Type(createMod3Map(this.sortCount));
    if (mod3Type !== '0002') return false;
    for (let key of tileSortKeys) {
      const blocks = this.getCashBlocks(key);
      if (blocks.length === 0) return false;
    }
    return true;
  }


}
