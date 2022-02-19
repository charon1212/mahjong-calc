import { Button } from "@mui/material";
import { useState } from "react";
import { analyzeBoard } from "../../domain/mahjong/analyze/analyze";
import { addTile, cloneBoard, deleteTile, getBoardLength, getInitialBoard } from "../../domain/mahjong/Board";
import { maxBoardLength } from "../../domain/mahjong/const";
import { BoardInfo } from "../../domain/mahjong/type";
import BoardViewer from "../components/boardViewer/BoardViewer";
import TileSelectArea from "../components/tileSelectArea/TileSelectArea";

type Props = {};
const EfficencyCalc = (props: Props) => {
  const {} = props;
  const [board, setBoard] = useState(getInitialBoard());
  const boardLength = getBoardLength(board);
  const c = (board: BoardInfo) => setBoard(cloneBoard(board));
  const [result, setResult] = useState<string>('');
  const onClickJudgeComp = () => {
    if (boardLength !== maxBoardLength) {
      alert('14牌そろっていません。');
      return;
    }
    const result = analyzeBoard(board);
    setResult(JSON.stringify(result));
  };
  const debug = () => {
    const start = Date.now();
    for (let i = 0; i < 1000; i++) {
      const result = analyzeBoard(board);
    }
    const end = Date.now();
    console.log({ diff: end - start });
  };

  return (
    <>
      <h3>手牌（クリックで削除）</h3>
      {result && <div style={{ color: 'red' }}>{result}</div>}
      <div style={{ minHeight: '65px' }}>
        <BoardViewer
          board={board}
          restSpaceLength={boardLength < maxBoardLength ? maxBoardLength - boardLength : 0}
          onClick={(t) => c(deleteTile(board, t))}
        />
      </div>
      <h3>牌一覧（クリックで追加）</h3>
      <TileSelectArea onClick={(t) => t && c(addTile(board, t))} />
      <div>
        <Button onClick={onClickJudgeComp}>アガリ判定</Button>
        <Button onClick={debug}>test</Button>
      </div>
    </>
  );
};

export default EfficencyCalc;
