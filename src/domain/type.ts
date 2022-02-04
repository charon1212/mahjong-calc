export type Tile = {
  n: number,
  s: TileSort,
};

export type TileSort = 'm' | 'p' | 's' | 'j';

export type BoardInfo = { [key in TileSort]: number[] };
