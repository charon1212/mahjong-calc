import { tileSortKeys } from "../const";
import { BoardInfo, TileSort } from "../type";

export type AnalyzeResult = {};
export const analyzeBoard = (b: BoardInfo): AnalyzeResult => {
  return {};
};

export const isComplete = (b: BoardInfo) => {

};

/**
 * 各牌種の総数から、アガリの可能性があるかを調べる。
 * 4つの牌種のうち、3つが3n個で、1つだけが3n+2個の場合、この関数は3n+2個の牌種を返却する。
 * 上記以外の場合は、undefinedを返却する。
 *
 * @returns アガリの可能性がある場合は雀頭が属する牌種を、そうでない場合はundefined。
 */
export const isCompleteSortLength = (b: BoardInfo): TileSort | undefined => {

  let head: TileSort | undefined = undefined;
  // 各牌種ごとの牌数Mod3を配列に整理する。　例：[ ['m', 0], ['p', 2], ['s', 0], [j, 0] ] ←この場合、m,s,jが3nで、pが3n+2だったことを表す。
  const arr: [TileSort, number][] = tileSortKeys.map((key) => [key, b[key].reduce((p, c) => p + c, 0) % 3]);
  for (let [s, mod3] of arr) {
    if (mod3 === 0) continue
    if (mod3 === 1) return undefined;
    if (head) return undefined;
    head = s;
  }
  return head;

};

export type Blocks = {
  head: number | undefined; // 雀頭
  series: number[][]; // 順子
  sets: number[][]; // 暗刻
};
/**
 * 配列データから、雀頭・順子・暗刻の組に分解する。
 *
 * @param arr 配列。字牌の場合は配列長7、それ以外は配列長9とする。
 * @param containHead 雀頭を含むかどうか。
 * @param allowSeries 順子を許容するか。字牌はfalse。
 * @param notSet 内部利用用の配列。外部から呼び出すときはundefined
 */
export const breakBlocks = (arr: number[], containHead: boolean, allowSeries: boolean, notSet?: number[]): Blocks[] => {

  if (notSet === undefined) notSet = [];
  const n = arr.length;
  const blocks = [] as Blocks[];
  if (containHead) {
    for (let i = 1; i <= n; i++) {
      if (arr[i - 1] >= 2) {
        const arr2 = [...arr];
        arr2[i - 1] -= 2;
        blocks.push(...(breakBlocks(arr2, false, allowSeries, notSet).map((v) => {
          v.head = i;
          return v;
        })));
      }
    }
  } else {
    if (allowSeries) {
      for (let i = 1; i <= n; i++) {
        if (arr[i - 1] < 3) continue
        if (notSet.includes(i)) continue
        const arr2 = [...arr];
        arr2[i - 1] -= 3;
        notSet.push(i);
        blocks.push(...(breakBlocks(arr2, false, allowSeries, [...notSet]).map((v) => {
          v.sets.push([i, i, i]);
          return v;
        })));
      }
    }
    const series = makeSeries([...arr]);
    if (series) blocks.push({ head: undefined, series: series, sets: [] });
  }
  return blocks;

};

/**
 * 指定した配列の要素を、順子の組に分解する。分解できない場合、undefinedを返却する。
 * @param arr i番目の要素が、i+1の牌の枚数を表す配列。この関数は、arrについて破壊的であるため、関数実行後は関数実行前と別の配列になる。[...arr]で指定すること。
 * @returns 分解できる場合、順子の組。そうでない場合、undefined。
 */
const makeSeries = (arr: number[]): number[][] | undefined => {
  const series = [] as number[][];
  const n = arr.length;
  let i = 0;
  do {
    if (arr[i] === 0) {
      i++;
    } else {
      if (arr[i + 1] <= 0 || arr[i + 2] <= 0) return undefined;
      series.push([i + 1, i + 2, i + 3]);
      arr[i]--;
      arr[i + 1]--;
      arr[i + 2]--;
    }
  } while (i < n - 2)
  if (arr[n - 2] !== 0 || arr[n - 1] !== 0) return undefined;
  return series;
};
