import type { Test } from './lib';

interface Bar {
  'a': string
}

type Res = Test<Bar>

type Res2 = Test<Pick<Bar, keyof Bar>>