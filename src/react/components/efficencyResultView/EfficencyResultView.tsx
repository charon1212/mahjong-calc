import { Typography } from '@mui/material';
import { AnalyzeResult } from '../../../domain/mahjong/analyze/analyze';
import ShowRest1Expect from './ShowRest1Expect';
import ShowRest2Expect from './ShowRest2Expect';
import ShowRest3Expect from './ShowRest3Expect';

type Props = { result: AnalyzeResult };
const EfficencyResultView = (props: Props) => {
  const { result } = props;
  return (
    <>
      <div style={{ margin: '10px' }}>
        <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
          計算結果
          {result.rest === 0 ? ' => アガリ' : ''}
          {result.rest === 1 ? ' => テンパイ' : ''}
          {result.rest === 2 ? ' => 1シャンテン' : ''}
          {result.rest === 3 ? ' => 2シャンテン' : ''}
          {result.rest === -1 ? ' => 3シャンテン以上' : ''}
        </Typography>
        <div>{result.rest === 1 ? <ShowRest1Expect expect={result.expect} /> : ''}</div>
        <div>{result.rest === 2 ? <ShowRest2Expect expect={result.expect} /> : ''}</div>
        <div>{result.rest === 3 ? <ShowRest3Expect expect={result.expect} /> : ''}</div>
      </div>
    </>
  );
};

export default EfficencyResultView;
