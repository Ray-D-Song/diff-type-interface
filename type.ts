import type { Test } from './lib';

type Bar = {
  a: string
}

type Res = Test<Bar>
