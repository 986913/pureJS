/*
  Ts中的Partial<T>返回一个包含所有T的子集的type。
  
  请你自行实现MyPartial<T>
  type Foo = {
    a: string
    b: number
    c: boolean
  }
  // below are all valid
  const a: MyPartial<Foo> = {}
  const b: MyPartial<Foo> = {
    a: 'BFE.dev'
  }
  const c: MyPartial<Foo> = {
    b: 123
  }
  const d: MyPartial<Foo> = {
    b: 123,
    c: true
  }
  const e: MyPartial<Foo> = {
    a: 'BFE.dev',
    b: 123,
    c: true
  }
 */

/*----------------------------- Solution ------------------------------------- */
// your code here, please don't use Partial<T> in your code
type MyPartial<T> = {[K in keyof T]?: T[K]}


/*-----------------------------  知识点 ------------------------------------- 

keyof 索引查询 对应任何类型 T, keyof T的结果为该类型上所有公有属性key的联合：

  interface Eg1 {
    name: string,
    readonly age: number,
  }
  // T1的类型实则是name | age
  type T1 = keyof Eg1

  class Eg2 {
    private name: string;
    public readonly age: number;
    protected home: string;
  }
  // T2实则被约束为 age
  // 而name和home不是公有属性，所以不能被keyof获取到
  type T2 = keyof Eg2

*/