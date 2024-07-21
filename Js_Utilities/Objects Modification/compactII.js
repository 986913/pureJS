/****************** Lodash_.compact.js  DeepClone.js 的变形题 *****************/

/**
  Implement a function compact(value) that returns a new object with all falsey values removed, 
  including falsey values that are deeply-nested. 
  You can assume the value only contains JSON-serializable values (null, boolean, number, string, Array, Object) 
  and will not contain any other objects like Date, Regex, Map or Set.

  The values false, null, 0, '', undefined, and NaN are falsey (you should know this by heart!).
 */

/* -------------------用例测试--------------------*/
compact([0, 1, false, 2, '', 3, null]); // [1, 2, 3]
compact({ foo: true, bar: null }); // { foo: true }

/* -------------------------- Code Solution: -------------------------------- */
/**
 * @param {Array|Object} value
 * @return {Array|Object}
 */
var compact = function (value) {
  if (typeof value !== 'object') return value;

  const result = Array.isArray(value) ? [] : {};

  for (let key in value) {
    if (Boolean(value[key]) === true) {
      if (Array.isArray(result)) {
        result.push(compactObject(value[key])); // 处理数组时，用push添加元素到结果数组
      } else {
        result[key] = compactObject(value[key]); // 处理对象时，用键值对方式添加属性到结果对象
      }
    }
  }

  return result;
};

/* ---------- Code Solution V2: shorter solution that adopts a more functional approach -------------- */
/**
 * @param {Array|Object} value
 * @return {Array|Object}
 */
function compact(value) {
  if (typeof value !== 'object' || value == null) return value;

  if (Array.isArray(value)) {
    return value.filter((item) => item).map((item) => compact(item));
  }

  return Object.fromEntries(
    Object.entries(value)
      .filter(([_, value]) => value)
      .map(([key, value]) => [key, compact(value)])
  );
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
