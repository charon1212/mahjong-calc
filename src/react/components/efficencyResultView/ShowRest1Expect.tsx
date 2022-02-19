import { Rest1Expect } from '../../../domain/mahjong/analyze/rest1';
import ShowExpectTable from './ShowExpectTable';

type Props = { expect: Rest1Expect };
const ShowRest1Expect = (props: Props) => {
  const { expect } = props;
  return (
    <>
      <ShowExpectTable data={expect.map((v) => ({ ...v, score: '-' }))} />
    </>
  );
};

export default ShowRest1Expect;
