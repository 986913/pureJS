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
