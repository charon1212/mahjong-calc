import { Blocks } from "./type";

/**
 * 配列データから、雀頭・順子・暗刻の組に分解する。
 *
 * @param arr 配列。字牌の場合は配列長7、それ以外は配列長9とする。
 * @param allowSeries 順子を許容するか。字牌はfalse。
 * @param innerCash 計算を効率化するためのキャッシュ。countは総数、notSetは暗刻にしない数値のリスト。
 * @returns 雀頭・順子・暗刻の取りうる組み合わせの配列。1,1,1,2,3,4,4,4のような、「11 : 123 : 444」とも「111 : 234 : 44」ともとれる場合、配列長2で両方を返却する。
 */
export const breakBlocks = (arr: number[], allowSeries: boolean, innerCash?: { count: number, notSet: number[], }): Blocks[] => {

  const count = innerCash?.count || arr.reduce((p, c) => p + c, 0);
  if (count === 0) return [{ head: undefined, sets: [], series: [] }];
  if (count % 3 === 1) return [];
  const containHead = count % 3 === 2;
  const notSet = innerCash?.notSet || [];
  const n = arr.length;
  if (n !== 7 && n !== 9) throw new Error('arrは配列長が7または9を期待します。');

  const blocks = [] as Blocks[];
  if (containHead) {
    for (let i = 1; i <= n; i++) {
      if (arr[i - 1] >= 2) {
        const arr2 = [...arr];
        arr2[i - 1] -= 2;
        blocks.push(...(breakBlocks(arr2, allowSeries, { count: count - 2, notSet }).map((v) => {
          v.head = i;
          return v;
        })));
      }
    }
  } else {
    for (let i = 1; i <= n; i++) {
      if (arr[i - 1] < 3) continue
      if (notSet.includes(i)) continue
      const arr2 = [...arr];
      arr2[i - 1] -= 3;
      notSet.push(i);
      blocks.push(...(breakBlocks(arr2, allowSeries, { count: count - 3, notSet: [...notSet] }).map((v) => {
        v.sets.push([i, i, i]);
        return v;
      })));
    }
    if (allowSeries) {
      const series = makeSeries([...arr]);
      if (series) blocks.push({ head: undefined, series: series, sets: [] });
    }
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
