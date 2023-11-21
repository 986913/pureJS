/**
  Implement a function deepOmit(obj, keys) that removes specified keys and their corresponding values from an object, 
  including nested objects or arrays. It works recursively to traverse through the entire object structure, 
  ensuring that all occurrences of the specified keys are removed at all levels. 
  The function takes in an object (obj) and a array of string keys (keys).
 */

/* -------------------用例测试1--------------------*/
deepOmit({ a: 1, b: 2, c: 3 }, ['b']); // { a: 1, c: 3 }
/* -------------------用例测试2--------------------*/
const obj = {
  a: 1,
  b: 2,
  c: {
    d: 3,
    e: 4,
  },
  f: [5, 6],
};
deepOmit(obj, ['b', 'c', 'e']); // { a: 1, f: [5, 6] }

/* -------------------------------- Code solution  -------------------------------------- */
/**
 * @param {any} val
 * @param {Array<string>} keys
 * @returns any
 */
function deepOmit(val, keys) {
  if (Array.isArray(val)) {
    return val.map((item) => deepOmit(item, keys));
  }

  if (isPlainObject(val)) {
    const newObj = {};
    for (const key in val) {
      if (!keys.includes(key)) {
        newObj[key] = deepOmit(val[key], keys);
      }
    }
    return newObj;
  }

  // Other values can be returned directly.
  return val;
}

const isPlainObject = (obj) => {
  if (obj === null || obj === undefined) return false;
  const prototype = Object.getPrototypeOf(obj);
  return prototype === null || prototype.constructor === Object;
};
