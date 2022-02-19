import { Rest3Expect } from '../../../domain/mahjong/analyze/rest3';
import ShowExpectTable from './ShowExpectTable';

type Props = { expect: Rest3Expect };
const ShowRest3Expect = (props: Props) => {
  const { expect } = props;
  return (
    <>
      <ShowExpectTable data={expect.map(({ push, get }) => ({ push, get: get.map((v) => v.get), score: '-' }))} />
    </>
  );
};

export default ShowRest3Expect;
