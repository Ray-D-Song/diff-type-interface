type Foo = Record<string, unknown>

type Env = {
  Foo: Foo
}

type Options<T extends Env> = {
  env: T
}

export type {
  Foo,
  Env,
  Options,
}