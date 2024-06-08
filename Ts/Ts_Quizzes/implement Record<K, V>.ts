/*
  Record<K, V>返回一个key是K值是V的object type。

  请自行实现MyRecord<K, V>。
  注意: 可以用作object key的只有 number | string | symbol。
  type Key = 'a' | 'b' | 'c'
  const a: Record<Key, string> = {
    a: 'BFE.dev',
    b: 'BFE.dev',
    c: 'BFE.dev'
  }
  a.a = 'bigfrontend.dev' // OK
  a.b = 123 // Error
  a.d = 'BFE.dev' // Error
  type Foo = MyRecord<{a: string}, string> // Error
 */

/*----------------------------- Solution ------------------------------------- */
// please don't use Record<K, V> in your code

/**
  * TypeScript only allows string or number or symbol to be VALID KEY of a TYPE
**/
type ValidKeyType = string | number | symbol;
/**
  * The type parameter `K` should only allow subset of ValidKeyType: `K extends ValidKeyType`.
  * Use Mapped Type, [X in K] : V
  *   - to get all the keys in `K` type.
  *   - Type parameter `V` is value of each key in `K`
**/

type MyRecord<K extends ValidKeyType, V> = {
  [X in K] : V
} 
