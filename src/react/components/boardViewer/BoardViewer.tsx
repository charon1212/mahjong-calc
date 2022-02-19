import { BoardInfo, Tile, TileSort } from '../../../domain/mahjong/type';
import TileView from '../tile/TileView';

const tileSortKeys: TileSort[] = ['m', 'p', 's', 'j'];
type Props = {
  board: BoardInfo;
  onClick?: (tile: Tile) => unknown;
  restSpaceLength: number;
};
const BoardViewer = (props: Props) => {
  const { board, onClick, restSpaceLength } = props;
  const show = (s: TileSort, arr: number[]) => {
    return [
      ...arr.map((v, i) =>
        [...Array(v)].map(() => (
          <div style={{ width: '7.14%' }}>
            <TileView
              tile={{ s, n: i + 1 }}
              onClick={() => {
                if (onClick) onClick({ s, n: i + 1 });
              }}
            />
          </div>
        ))
      ),
    ];
  };
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
        {show('m', board.m)}
        {show('p', board.p)}
        {show('s', board.s)}
        {show('j', board.j)}
        {[...Array(restSpaceLength)].map(() => (
          <div style={{ width: '7.14%' }}>
            <TileView />
          </div>
        ))}
      </div>
    </>
  );
};

export default BoardViewer;
