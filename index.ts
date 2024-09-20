import type { Options } from './type'

interface Foo {
  name: string
}

interface Param {
  Foo: Foo
}

type Test = Options<Param>
