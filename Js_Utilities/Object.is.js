/**
  [Object.is()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) is similar to `===` except following cases:
    Object.is(0, -0) // false
    0 === -0 // true
    Object.is(NaN, NaN) // true
    NaN === NaN // false

  Here is the [detailed spec](https://www.ecma-international.org/ecma-262/6.0/#sec-samevalue), can you implement your own `is()`?
 */

/*-------------------- 用例测试-------------------------*/
is(0, true); //false
is(0, '0'); //false
is('0', '0'); //true
is('true', 'true'); //true
is({}, {}); //false
is(0, 0); //true
is(0, -0); //false
is(-0, 0); //false
is(0, true); //false
is(-0, -0); //true
is(NaN, NaN); //true
is(Infinity, Infinity); // true

/* ---------------------------- Solution -------------------------------- */
/**
 * @param {any} a
 * @param {any} b
 * @return {boolean}
 */
function is(a, b) {
  let aNegZero = isItNegZero(a);
  let bNegZero = isItNegZero(b);

  /* for this case: is(NaN, NaN)*/
  if (isItNaN(a) && isItNaN(b)) {
    return true;
  } else if (aNegZero || bNegZero) {
    /* for this case: is(0, 0), is(0,-0), is(-0, 0), is(-0,0),  because -0 === 0 is true...  */
    return aNegZero && bNegZero;
  } else {
    // All other cases with regular === comparison
    return a === b;
  }
}

// helper functions :
const isItNegZero = (val) => val == 0 && 1 / val === -Infinity;
const isItNaN = (val) => val !== val;
