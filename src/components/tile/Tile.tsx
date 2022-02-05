import React from 'react';
import { Tile as TileType } from '../../domain/mahjong/type';
import * as img from './img/import';

type Props = {
  tile?: TileType;
  divStyle?: React.CSSProperties;
  onClick?: (tile?: TileType) => unknown;
};
const Tile = (props: Props) => {
  const { tile, divStyle, onClick } = props;
  return (
    <>
      <div
        style={{ ...divStyle }}
        onClick={() => {
          if (onClick) onClick(tile);
        }}
      >
        {tile ? <img style={{ width: '100%' }} src={getSource(tile)} /> : ''}
      </div>
    </>
  );
};

const getSource = (tile: TileType): string => {
  if (tile.s === 'm') {
    if (tile.n === 1) return img.m1.default;
    if (tile.n === 2) return img.m2.default;
    if (tile.n === 3) return img.m3.default;
    if (tile.n === 4) return img.m4.default;
    if (tile.n === 5) return img.m5.default;
    if (tile.n === 6) return img.m6.default;
    if (tile.n === 7) return img.m7.default;
    if (tile.n === 8) return img.m8.default;
    if (tile.n === 9) return img.m9.default;
  } else if (tile.s === 'p') {
    if (tile.n === 1) return img.p1.default;
    if (tile.n === 2) return img.p2.default;
    if (tile.n === 3) return img.p3.default;
    if (tile.n === 4) return img.p4.default;
    if (tile.n === 5) return img.p5.default;
    if (tile.n === 6) return img.p6.default;
    if (tile.n === 7) return img.p7.default;
    if (tile.n === 8) return img.p8.default;
    if (tile.n === 9) return img.p9.default;
  } else if (tile.s === 's') {
    if (tile.n === 1) return img.s1.default;
    if (tile.n === 2) return img.s2.default;
    if (tile.n === 3) return img.s3.default;
    if (tile.n === 4) return img.s4.default;
    if (tile.n === 5) return img.s5.default;
    if (tile.n === 6) return img.s6.default;
    if (tile.n === 7) return img.s7.default;
    if (tile.n === 8) return img.s8.default;
    if (tile.n === 9) return img.s9.default;
  } else if (tile.s === 'j') {
    if (tile.n === 1) return img.j1.default;
    if (tile.n === 2) return img.j2.default;
    if (tile.n === 3) return img.j3.default;
    if (tile.n === 4) return img.j4.default;
    if (tile.n === 5) return img.j5.default;
    if (tile.n === 6) return img.j6.default;
    if (tile.n === 7) return img.j7.default;
  }
  return '';
};

export default Tile;
