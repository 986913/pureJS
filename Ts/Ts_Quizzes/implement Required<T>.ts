/*
  和Partial<T>正好相反， Required<T>会将所有的属性设为required。

  请自行实现MyRequired<T>
  // all properties are optional
  type Foo = {
    a?: string
    b?: number
    c?: boolean
  }
  const a: MyRequired<Foo> = {}
  // Error
  const b: MyRequired<Foo> = {
    a: 'BFE.dev'
  }
  // Error
  const c: MyRequired<Foo> = {
    b: 123
  }
  // Error
  const d: MyRequired<Foo> = {
    b: 123,
    c: true
  }
  // Error
  const e: MyRequired<Foo> = {
    a: 'BFE.dev',
    b: 123,
    c: true
  }
  // valid
 */

/*----------------------------- Solution ------------------------------------- */
// your code here, please don't use Required<T> in your code
  type MyRequired<T> = {
  // the 'optional' symbol = '?'
  // the 'not' symbol = '-'
  // K is not optional in T
  [K in keyof T]-?: T[K]
}
