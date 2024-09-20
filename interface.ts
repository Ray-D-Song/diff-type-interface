import type { Test } from './lib';

interface Bar {
  a: string
}

type Res = Test<Bar>
