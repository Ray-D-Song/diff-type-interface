import type { Test } from './lib';

interface Foo {
  a: string
}

type Res = Test<Foo>
