最近遇到一个奇怪的问题，interface 定义了一个符合要求的类型，却无法作为泛型参数。  
```ts
type Foo = Record<string, unknown>

type Test<K extends Foo> = K

interface Bar {
  'a': string
}

/**
 * error:
 * Type 'Bar' does not satisfy the constraint 'Foo'.
 * Index signature for type 'string' is missing in type 'Bar'.
 */
type Res = Test<Bar>
```
TS 提示 Bar 类型不满足 Foo 的定义，这本质是一个隐式索引签名丢失的问题。  

## 什么是隐式索引签名
`隐式索引签名(implicit index signatures)`是 TypeScript 的一个特性，允许你定义一个对象类型，可以使用任意字符串作为键。  
这意味着你可以创建一个对象，在这个对象中，键的名称是动态的，而值的类型是统一的。  

例如
```ts
type Bar = {
  [key: string]: number
}
const bar: Bar = {
  'a': 1,
  'b': 2
}
```

## 解决方案
隐式索引丢失的问题仅限 interface，type 没有这个问题。  
也就是说开头的例子，将 Bar 的定义修改为 type 即可：

```ts
type Foo = Record<string, unknown>

type Test<K extends Foo> = K

type Bar = { // [!code highlight]
  a: string
}

type Res = Test<Bar>
```
如果你的类型不便修改，例如它是定义在 node_modules 中的库类型，你也可以使用`Pick`将 interface 转换为 type。
```ts
type Foo = Record<string, unknown>

type Test<K extends Foo> = K

interface Bar {
  a: string
}

type Res = Test<Pick<Bar, keyof Bar>> // [!code highlight]
```

interface 这种行为其实符合 TypeScript team 的预期，相关讨论在 2017 年就已经有了。

https://github.com/microsoft/TypeScript/issues/15300

官方解释是：
「interface 可以通过同名接口合并进行增强，而 type 不可以，所以为 type 进行隐式索引推断会更安全」

