// Lodash _.once documentation:  https://lodash.com/docs/#once

/* -------------------用例测试1--------------------*/
let i = 1;

function incrementBy(value) {
  i += value;
  return i;
}

const incrementByOnce = once(incrementBy);
incrementByOnce(2); // i is now 3; The function returns 3.
incrementByOnce(3); // i is still 3; The function returns the result of the first invocation, which is 3.
i = 4;
incrementByOnce(2); // i is still 3 as it is not modified. The function returns the result of the first invocation, which is 3.

/* -------------------------- Code Solution: -------------------------------- */
/**
 * @callback func
 * @return {Function}
 */

function once(func) {
  let isFirstCall = true;
  let value; // save output after 1st call

  return function (...step) {
    if (isFirstCall) {
      isFirstCall = false;
      value = func.apply(this, step);
    }
    return value;
  };
}
