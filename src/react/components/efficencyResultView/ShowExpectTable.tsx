import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Tile } from '../../../domain/mahjong/type';
import TileView from '../tile/TileView';

type Props = { data: { push: Tile; get: Tile[]; score: string }[] };
const ShowExpectTable = (props: Props) => {
  const { data } = props;
  return (
    <>
      <TableContainer component={Paper}>
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell>捨て牌</TableCell>
              <TableCell>待ち</TableCell>
              <TableCell>スコア</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(({ push, get }, i) => (
              <TableRow key={i}>
                <TableCell component='th' scope='row'>
                  <div style={{ width: '40px' }}>
                    <TileView tile={push} />
                  </div>
                </TableCell>
                <TableCell>
                  <div style={{ display: 'flex' }}>
                    {get.map((v) => (
                      <div style={{ width: '40px' }}>
                        <TileView tile={v} />
                      </div>
                    ))}
                  </div>
                </TableCell>
                <TableCell>-</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ShowExpectTable;
