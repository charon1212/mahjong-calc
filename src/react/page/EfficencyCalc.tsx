import { Button, Typography } from '@mui/material';
import { useState } from 'react';
import { analyzeBoard, AnalyzeResult } from '../../domain/mahjong/analyze/analyze';
import { addTile, cloneBoard, deleteTile, getBoardLength, getInitialBoard } from '../../domain/mahjong/Board';
import { maxBoardLength } from '../../domain/mahjong/const';
import { BoardInfo } from '../../domain/mahjong/type';
import BoardViewer from '../components/boardViewer/BoardViewer';
import EfficencyResultView from '../components/efficencyResultView/EfficencyResultView';
import TileSelectArea from '../components/tileSelectArea/TileSelectArea';

type Props = {};
const EfficencyCalc = (props: Props) => {
  const {} = props;
  const [board, setBoard] = useState(getInitialBoard());
  const boardLength = getBoardLength(board);
  const c = (board: BoardInfo) => setBoard(cloneBoard(board));
  const [result, setResult] = useState<AnalyzeResult | undefined>(undefined);
  const onClickJudgeComp = () => {
    if (boardLength !== maxBoardLength) {
      alert('14牌そろっていません。');
      return;
    }
    setResult(analyzeBoard(board));
  };

  return (
    <>
      {result === undefined ? '' : <EfficencyResultView result={result} />}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
          手牌（クリックで削除）
        </Typography>
        <Button onClick={onClickJudgeComp} variant='contained' sx={{ width: '100px', height: '30px' }}>
          計算
        </Button>
      </div>
      <div style={{ minHeight: '65px' }}>
        <BoardViewer
          board={board}
          restSpaceLength={boardLength < maxBoardLength ? maxBoardLength - boardLength : 0}
          onClick={(t) => c(deleteTile(board, t))}
        />
      </div>
      <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
        牌一覧（クリックで追加）
      </Typography>
      <TileSelectArea onClick={(t) => t && c(addTile(board, t))} />
    </>
  );
};

export default EfficencyCalc;
