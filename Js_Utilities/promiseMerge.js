/**
  Implement a function that accepts two promises and returns a single Promise. 
  This returned promise fulfills when both input promises fulfill, 
  with a single value according to the order and types of the fulfillment values:
    Numbers should be added together.
    Strings should be concatenated.
    Arrays should be combined into a single array.
    Plain objects should be merged into a single object.
    Other types aren't supported.
  The return promise can also be rejected if one of the following happens:
    The types of the fulfilled results do not match, reject with the string 'Unsupported data types'.
    One of the promises fail, reject with the rejected promise's reason.
 */

/* ----------------------- 用例测试 ----------------------- */
await promiseMerge(Promise.resolve(1), Promise.resolve(2)); // 3
await promiseMerge(Promise.resolve('abc'), Promise.resolve('def')); // 'abcdef'
await promiseMerge(Promise.resolve([1, 2, 3]), Promise.resolve([4, 5, 6])); // [1, 2, 3, 4, 5, 6]
await promiseMerge(Promise.resolve({ foo: 1 }), Promise.resolve({ bar: 2 })); // { foo: 1, bar: 2}

await promiseMerge(Promise.resolve(1), Promise.resolve([])); // Rejected with 'Unsupported data types'
await promiseMerge(Promise.reject(1), Promise.resolve(2)); // Rejected with 1

/*  -------------- Solution1: Manual coordination,手写Promise.all的变形题  ------------------ */
/**
 * @param {Promise} p1
 * @param {Promise} p2
 * @return {Promise<any>}
 */
function promiseMerge(p1, p2) {
  let unresolved = 2;
  let p1Result, p2Result;

  // return new single promise here
  return new Promise((resolve, reject) => {
    function next() {
      unresolved--;
      if (unresolved === 0) resolve(mergeResult(p1Result, p2Result));
    }

    //use Promise.then()
    p1.then((data1) => {
      p1Result = data1;
      next();
    }).catch(reject);
    p2.then((result) => {
      p2Result = result;
      next();
    }).catch(reject);
  });
}

function mergeResult(result1, result2) {
  try {
    if (typeof result1 === 'number' && typeof result2 === 'number') {
      return result1 + result2;
    }
    if (typeof result1 === 'string' && typeof result2 === 'string') {
      return result1 + result2;
    }
    if (Array.isArray(result1) && Array.isArray(result2)) {
      return [...result1, ...result2];
    }
    if (isPlainObject(result1) && isPlainObject(result2)) {
      return { ...result1, ...result2 };
    }
    throw 'Unsupported data types';
  } catch {
    throw 'Unsupported data types';
  }
}
const isPlainObject = (obj) => {
  if (obj === null || obj === undefined) return false;
  const prototype = Object.getPrototypeOf(obj);
  return prototype === null || prototype === Object.prototype;
};

/*  ---------------------- Solution2:  Using serial await  ---------------------- */
/**
 * @param {Promise} p1
 * @param {Promise} p2
 * @return {Promise<any>}
  This solution is very simple but is non-optimal because the promises are resolved serially instead of in parallel.
 */
async function promiseMerge(p1, p2) {
  const data1 = await p1;
  const data2 = await p2;
  try {
    if (typeof data1 === 'number' && typeof data2 === 'number')
      return data1 + data2;
    else if (typeof data1 === 'string' && typeof data2 === 'string')
      return `${data1}${data2}`;
    else if (Array.isArray(data1) && Array.isArray(data2))
      return [...data1, ...data2];
    else if (isPlainObject(data1) && isPlainObject(data2))
      return { ...data1, ...data2 };
    else throw 'Unsupported data types';
  } catch {
    throw 'Unsupported data types';
  }
}

/*  ---------------------- Solution3: use Promise.all() ---------------------- */
/**
 * @param {Promise} p1
 * @param {Promise} p2
 * @return {Promise<any>}
 *  Using Promise.all() will simplify the code a lot. However, 
    you might not be allowed to use that during interviews, 
    so it's still useful to know how track the states of the promises manually.
 */
function promiseMerge(p1, p2) {
  return Promise.all([p1, p2]).then(([result1, result2]) => {
    try {
      if (typeof result1 === 'number' && typeof result2 === 'number') {
        return result1 + result2;
      }

      if (typeof result1 === 'string' && typeof result2 === 'string') {
        return result1 + result2;
      }

      if (Array.isArray(result1) && Array.isArray(result2)) {
        return [...result1, ...result2];
      }

      if (isPlainObject(result1) && isPlainObject(result2)) {
        return { ...result1, ...result2 };
      }

      throw 'Unsupported data types';
    } catch {
      throw 'Unsupported data types';
    }
  });
}
