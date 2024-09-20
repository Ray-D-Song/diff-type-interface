type Foo = Record<string, unknown>

type Test<K extends Foo> = K

export type {
  Test
}