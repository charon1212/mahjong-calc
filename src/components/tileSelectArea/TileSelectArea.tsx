import { Tile as TileType } from '../../domain/type';
import Tile from '../tile/Tile';

type Props = {};
const TileSelectArea = (props: Props) => {
  const {} = props;
  return (
    <>
      <div style={{ width: '300px' }}>
        <TileSelectRow s='m' />
        <TileSelectRow s='p' />
        <TileSelectRow s='s' />
        <TileSelectRow s='j' />
      </div>
    </>
  );
};

type PropsTileSelectRow = {
  s: TileType['s'];
};
const TileSelectRow = (props: PropsTileSelectRow) => {
  const { s } = props;
  const max = s === 'j' ? 7 : 9;
  const arr = [...Array(9)].map((_, i) => i + 1);
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
        {arr.map((i) => (
          <Tile tile={i <= max ? { n: i, s } : undefined} divStyle={{ width: '11%' }} />
        ))}
      </div>
    </>
  );
};

export default TileSelectArea;
