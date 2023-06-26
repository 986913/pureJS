/**
  [Object.is()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) is similar to `===` except following cases:
    Object.is(0, -0) // false
    0 === -0 // true
    Object.is(NaN, NaN) // true
    NaN === NaN // false

  Here is the [detailed spec](https://www.ecma-international.org/ecma-262/6.0/#sec-samevalue), can you implement your own `is()`?
 */

/* ---------------------------- Solution -------------------------------- */
/**
 * @param {any} a
 * @param {any} b
 * @return {boolean}
 */
function is(a, b) {
  /* for this case: is(NaN, NaN), because  NaN !== NaN is true  */
  if (a !== a) {
    return b !== b; // returns true if the second parameter is NaN too
  }
  /* for this case: is(0, 0), is(0,-0), is(-0, 0), is(-0,0), because  -0 === 0 is true...  */
  if (a === 0 && b === 0) {
    return 1 / a === 1 / b; // 1 / -0 is -Infinity, and -Infinity === -Infinity
  }

  // All other cases with regular === comparison
  return a === b;
}
