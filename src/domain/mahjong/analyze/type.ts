import { TileSort } from "../type";

// 牌種の分解方法の1つを表すデータ型
export type Blocks = {
  head: number | undefined; // 雀頭
  series: number[][]; // 順子
  sets: number[][]; // 暗刻
};

export type TileSortCount = { [key in TileSort]: number };

// Mod3解析用
/**
 * Mod3タイプは、14枚の手牌に対する、mod3マップの組成を分類したもの。この5種類しかない。
 */
export type Mod3Type = '0011' | '0002' | '0122' | '1112' | '2222';
/**
 * Mod3マップは牌種(TileSort)の2次元配列で、第1引数がその牌種の総数のmod3の場所に配置する。
 * 例えば、手牌が123m45p6s11444j なら、 Mod3マップはresult = [['m'], ['s'], ['p', 'j']]となる。
 *     - 萬子は3 = 0(mod3)なので、result[0]の配列に格納。
 *     - ピンズは2 = 2(mod3)なので、result[2]の配列に格納。
 *     - ソーズは1 = 1(mod3)なので、result[1]の配列に格納。
 *     - 字牌は5 = 2(mod3)なので、result[2]の配列に格納。
 */
export type Mod3Map = [TileSort[], TileSort[], TileSort[]];
