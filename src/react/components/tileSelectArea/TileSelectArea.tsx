import { Tile } from '../../../domain/mahjong/type';
import TileView from '../tile/TileView';

type Props = {
  onClick?: (tile?: Tile) => unknown;
};
const TileSelectArea = (props: Props) => {
  const { onClick } = props;
  return (
    <>
      <div style={{ width: '100%' }}>
        <TileSelectRow s='m' onClick={onClick} />
        <TileSelectRow s='p' onClick={onClick} />
        <TileSelectRow s='s' onClick={onClick} />
        <TileSelectRow s='j' onClick={onClick} />
      </div>
    </>
  );
};

type PropsTileSelectRow = {
  s: Tile['s'];
  onClick?: (tile?: Tile) => unknown;
};
const TileSelectRow = (props: PropsTileSelectRow) => {
  const { s, onClick } = props;
  const max = s === 'j' ? 7 : 9;
  const arr = [...Array(9)].map((_, i) => i + 1);
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
        {arr.map((i) => (
          <TileView tile={i <= max ? { n: i, s } : undefined} divStyle={{ width: '11%' }} onClick={onClick} />
        ))}
      </div>
    </>
  );
};

export default TileSelectArea;
