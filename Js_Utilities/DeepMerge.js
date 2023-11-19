/**
  Implement a function deepMerge(objA, objB) to takes in two objects and returns a new object after deep merging them:
    The resulting object should contain a union of the keys/values of both objects.
    If the same key is present on both objects, the merged value will be from objB, unless:
      Both values are arrays: the elements from objB will be appended behind objA's.
      Both values are objects: merge the objects as per the same rules for deepMerge.
    Arrays and objects within the merged object should be new instances.
  
  The input objects should not be modified.
 */

/* -------------------用例测试--------------------*/
deepMerge({ a: 1 }, { b: 2 }); // { a: 1, b: 2 }
deepMerge({ a: 1 }, { a: 2 }); // { a: 2 }
deepMerge({ a: 1, b: [2] }, { b: [3, 4] }); // { a: 1, b: [2, 3, 4] }
deepMerge({ a: 1, b: [2] }, { c: [3, 4] }); // { a: 1, b: [2], c:[3, 4] }
deepMerge({ foo: 2, bar: 3 }, { bar: 4 }); //{ foo: 2, bar: 4 }

/* ------------- Code solution: recurrsion ---------------------------------- */
/**
 * @param {Object|Array} valA
 * @param {Object|Array} valB
 * @returns Object|Array
 */
function deepMerge(valA, valB) {
  // both values are arrays
  if (Array.isArray(valA) && Array.isArray(valB)) return [...valA, ...valB];

  // both values are objects
  if (isPlainObject(valA) && isPlainObject(valB)) {
    const newObj = { ...valA };
    for (const key in valB) {
      if (Object.prototype.hasOwnProperty.call(valA, key)) {
        newObj[key] = deepMerge(valA[key], valB[key]);
      } else {
        newObj[key] = valB[key];
      }
    }
    return newObj;
  }

  return valB; // for the case like: deepMerge({ foo: 2, bar: 3 }, { bar: 4 }); ---> { foo: 2, bar: 4 }
}

// helper function:
const isPlainObject = (obj) => {
  if (obj === null || obj === undefined) return false;

  const prototype = Object.getPrototypeOf(obj);
  return prototype === null || prototype.constructor === Object;
};
