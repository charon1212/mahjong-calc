import { Tile as TileType } from '../../domain/type';
import Tile from '../tile/Tile';

type Props = {
  onClick?: (tile?: TileType) => unknown;
};
const TileSelectArea = (props: Props) => {
  const { onClick } = props;
  return (
    <>
      <div style={{ width: '300px' }}>
        <TileSelectRow s='m' onClick={onClick} />
        <TileSelectRow s='p' onClick={onClick} />
        <TileSelectRow s='s' onClick={onClick} />
        <TileSelectRow s='j' onClick={onClick} />
      </div>
    </>
  );
};

type PropsTileSelectRow = {
  s: TileType['s'];
  onClick?: (tile?: TileType) => unknown;
};
const TileSelectRow = (props: PropsTileSelectRow) => {
  const { s, onClick } = props;
  const max = s === 'j' ? 7 : 9;
  const arr = [...Array(9)].map((_, i) => i + 1);
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
        {arr.map((i) => (
          <Tile tile={i <= max ? { n: i, s } : undefined} divStyle={{ width: '11%' }} onClick={onClick} />
        ))}
      </div>
    </>
  );
};

export default TileSelectArea;
