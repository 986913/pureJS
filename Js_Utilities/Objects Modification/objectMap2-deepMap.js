/**
  Implement a function deepMap(value, fn) to return a new value containing the results of calling a provided function on every non-Array and non-Object element in the value input, 
  including elements within nested Arrays and Objects. 
  The function fn is called with a single argument, the element that is being mapped/transformed.
 */

/* --------------------- 用例测试 1 ----------------------- */
const double = (x) => x * 2;

deepMap(2, double); // 4
deepMap([1, 2, 3], double); // [4, 5, 6]
deepMap({ a: 1, b: 2, c: 3 }, double); // { a: 2, b: 4, c: 6 }
deepMap(
  {
    foo: 1,
    bar: [2, 3, 4],
    qux: { a: 5, b: 6 },
  },
  double
); // => { foo: 2, bar: [4, 6, 8], qux: { a: 10, b: 12 } }

/* ---------------------------- Solution -------------------------------- */
/**
 * @param {any} value
 * @param {Function} fn
 * @returns any
 */
function deepMap(value, fn) {
  /* We need to pass the original value object across recursion calls, 
    hence we create a mapHelper() helper function that takes in an extra parameter original, 
    so that all recursive calls have access to both the current element and the original value. */
  return helper(value, fn, value);
}

const helper = (element, fn, original) => {
  // when element is array:
  if (Array.isArray(element))
    return element.map((ele) => helper(ele, fn, original));

  // when element is object:
  if (isPlainObject(element)) {
    const entries = Object.entries(element);
    return Object.fromEntries(
      entries.map(([key, val]) => [key, helper(val, fn, original)])
    );
  }

  // when element is primitive or null, or regex type etc..
  return fn.call(original, element);
};

const isPlainObject = (obj) => {
  if (obj === null) return false;
  const prototype = Object.getPrototypeOf(obj);
  return prototype === null || prototype === Object.prototype;
};

/**
  There are two types of plain objects:

    Objects without prototypes, created using Object.create(null).
    Object defined using literals (e.g. let a = {}).

  To check for the first case, Object.getPrototypeOf(value) will be exactly null. 
  To check for the second case, we can use the constructor of its prototype,
 */
