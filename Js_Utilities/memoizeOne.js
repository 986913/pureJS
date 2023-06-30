/**
  In problem [Implement a general memoization function]， you are asked to implement a memo function without space concern.
  But in reality, it could be a problem if cache bloats.

  You might need to restrict the cache capacity, just like [memoize-one](https://github.com/alexreardon/memoize-one) , it only remembers the latest arguments and result.
  Please implement your own `memoizeOne()`, it takes 2 arguments
    1. target function
    2. (optional) a equality check function to compare current and last arguments
  Default equality check function should be a shallow comparison on array items with strict equal `===`.
 */

/*-------------------- 用例测试1 -------------------------*/
const func = (...args) => args
const memoed = memoizeOne(func)；
expect(typeof memoed).toBe('function')
/*-------------------- 用例测试2 -------------------------*/
const func = (...args) => args
const memoed = memoizeOne(func)；
memoed(1) //[1]
memoed(1, 2) //[1,2]
memoed(1, 2, 3) //[1,2,3]
/*-------------------- 用例测试3 -------------------------*/
function funcThis(b){
  return `${this.a}_${b}`
}
const memoed = memoizeOne(funcThis)
const a = {
  a: 1,
  memoed
}
a.memoed(2)//'1_2'
a.memoed(3)//'1_3'
/*-------------------- 用例测试4 -------------------------*/
let callCount = 0
function funcThis(b){
  callCount += 1
  return `${this.a}_${b}`
}
const memoed = memoizeOne(funcThis)
const a = {
  a: 1,
  memoed
}
const b = {
  a: 2,
  memoed
}
a.memoed(2) //'1_2'
callCount) //1
a.memoed(2) //'1_2'
callCount// 1
a.memoed(3) //'1_3'
callCount //2
a.memoed(3)//'1_3'
callCount//2
b.memoed(3))//'2_3'
callCount// 3
a.memoed(3)// '1_3'
callCount//4
/*-------------------- 用例测试5 -------------------------*/
let callCount = 0
const func = (a, b) => {
  callCount += 1
  return a + b
}
const memoed = memoizeOne(func)
expect(memoed(1,2)).toBe(3)
expect(callCount).toBe(1)
expect(memoed(1,2)).toBe(3)
expect(callCount).toBe(1)
expect(memoed(1,3)).toBe(4)
expect(callCount).toBe(2)
/*-------------------- 用例测试6 -------------------------*/
let callCount = 0
const func = (a, b) => {
  callCount += 1
  return a + b
}
const memoed = memoizeOne(func)
expect(memoed(1,2)).toBe(3)
expect(callCount).toBe(1)
expect(memoed(1,'2')).toBe('12')
expect(callCount).toBe(2)
expect(memoed(1,'2')).toBe('12')
expect(callCount).toBe(2)
/*-------------------- 用例测试7 -------------------------*/
let callCount = 0
const func = (a, b) => {
  callCount += 1
  return a + b
}
const memoed = memoizeOne(func)
expect(memoed(1,2)).toBe(3)
expect(callCount).toBe(1)
expect(memoed(1,3)).toBe(4)
expect(callCount).toBe(2)
expect(memoed(1,2)).toBe(3)
expect(callCount).toBe(3)
expect(memoed(1,3)).toBe(4)
expect(callCount).toBe(4)
expect(memoed(1,3)).toBe(4)
expect(callCount).toBe(4)
/*-------------------- 用例测试8 -------------------------*/
let callCount = 0
const func = (a, b, c) => {
  callCount += 1
  return a + b + c
}
const memoed = memoizeOne(func, (args1, args2) => Math.max(...args1) === Math.max(...args2)
                    )
expect(memoed(1,2,3)).toBe(6)
expect(callCount).toBe(1)
expect(memoed(1,1,3)).toBe(6)
expect(callCount).toBe(1)
expect(memoed(2,2,3)).toBe(6)
expect(callCount).toBe(1)
expect(memoed(2,2,2)).toBe(6)
expect(callCount).toBe(2)


/* --------------------------------- Code solution ------------------------------------- */