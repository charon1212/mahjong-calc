import { Rest2Expect } from '../../../domain/mahjong/analyze/rest2';
import ShowExpectTable from './ShowExpectTable';

type Props = { expect: Rest2Expect };
const ShowRest2Expect = (props: Props) => {
  const { expect } = props;
  return (
    <>
      <ShowExpectTable data={expect.map(({ push, get }) => ({ push, get: get.map((v) => v.get), score: '-' }))} />
    </>
  );
};

export default ShowRest2Expect;
