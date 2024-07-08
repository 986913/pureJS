// Lodash _.fromPairs documentation: https://lodash.com/docs/4.17.15#fromPairs

/* Implement a function fromPairs(pairs) that transforms a list of key-value pairs into an object. */

/* -------------------用例测试--------------------*/
const pairs = [
  ['a', 1],
  ['b', 2],
  ['c', 3],
];
fromPairs(pairs); // => { a: 1, b: 2, c: 3 }

/* -------------------------- Code Solution 1: build-in method: Object.fromEntries( ) -------------------------------- */
/**
 * Creates an object from an array of key-value pairs.
 *
 * @param {Array} pairs - An array of key-value pairs.
 * @returns {Object} - The object composed from the key-value pairs.
 */
function fromPairs(pairs) {
  return Object.fromEntries(pairs);
}

/* -------------------------- Code Solution 2: ------------------------------- */
function fromPairs(pairs) {
  let result = {};
  pairs.forEach(([key, val]) => {
    result[key] = val;
  });
  return result;
}
/***
  知识点： 
    Object.entries({foo:'bar', baz:42} )              --->  [ ['foo', 'bar'], ['baz', 42] ]
    Object.fromEntries ( [['foo','bar'],['baz',42]] ) --->  {foo:'bar', baz:42}

    ------------------------------------ Examples --------------------------------------------
    const map = new Map()
    map.set('ming', 1)

    Object.entries(map)                   // [],                    因为Object.entries()不能作用于Map实例
    [...map.entries()]                    // 转化为数组[["ming", 1]], Map实例要使用.entries(), 注意返回的是generator!
    Object.entries({'ming': 1})           // 转化为数组[["ming", 1]], 因为Object.entries()作用于普通object

    Object.fromEntries(map);              //转为普通object: { ming: 1}, 因为Object.fromEntries()也能作用于Map实例！
    Object.fromEntries([['ming', 1]]);    //转为普通object: { ming: 1}, 因为Object.fromEntries()能作用于数组

 */
