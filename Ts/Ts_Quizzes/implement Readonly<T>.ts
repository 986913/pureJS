/*
  Readonly<T>返回将T的全部属性设为readonly后的type。

  请自行实现MyReadonly<T>
  type Foo = {
    a: string
  }

  const a:Foo = {
    a: 'BFE.dev',
  }
  a.a = 'bigfrontend.dev'
  // OK

  const b:MyReadonly<Foo> = {
    a: 'BFE.dev'
  }
  b.a = 'bigfrontend.dev'
  // Error
 */

/*----------------------------- Solution ------------------------------------- */
// your code here, please don't use Readonly<T> in your code
type MyReadonly<T> = {
  readonly [K in keyof T]: T[K]
}

/*-----------------------------  知识点 ------------------------------------- 
  keyof   索引类型查询操作符。 对于任何类型 `T`， `keyof T`的结果为 `T`上已知的公共属性名的联合。
  T[K] 索引访问操作符。根据属性名获得对应类型
*/

