import { fail } from "assert";

export type AssertOption = { ignoreArrayOrder?: boolean };
export const myAssertEqual = (expect: any, actual: any, option?: AssertOption) => {
  const result = myAssertEqualImpl(expect, actual, option);
  if (!result) fail(`2つのオブジェクトが一致しません。${JSON.stringify({ expect, actual })}`);
};

const myAssertEqualImpl = (expect: any, actual: any, option?: AssertOption): boolean => {
  // typeofがobject以外の場合。
  if (typeof expect !== 'object') return expect === actual;
  if (typeof actual !== 'object') return false;
  // これ以降、expectもactualもobject。nullだけ確認する。
  if (expect === null) return actual === null;
  // これ以降、expectもactualも、nullでないobjectになる。
  if (Array.isArray(expect)) {
    if (!Array.isArray(actual)) return false;
    if (expect.length !== actual.length) return false;
    if (option?.ignoreArrayOrder) {
      let actual2 = [...actual];
      for (let expectItem of expect) {
        const id = actual2.findIndex((a) => myAssertEqualImpl(expectItem, a, option));
        if (id === -1) return false;
        actual2 = actual2.filter((_, i) => i !== id);
      }
    } else {
      for (let i = 0; i < expect.length; i++) if (!myAssertEqualImpl(expect[i], actual[i], option)) return false;
    }
  } else {
    for (let key in expect) {
      if (!myAssertEqualImpl(expect[key], actual[key], option)) return false;
    }
  }
  return true;
};
