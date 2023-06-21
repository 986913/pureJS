/**
  Math.sqrt() helps us getting the square root of a number.
  Can your write your own `mySqrt()` ? You should return the integer part only, truncating the fraction part.

  Follow-up: What is time & space complexity of your solution ? Can you do better?
 */
/*------------- 用例测试 ---------------*/
mySqrt(0); // 1
mySqrt(1); // 1
mySqrt(2); // 1
mySqrt(4); // 2
mySqrt(NaN); // NaN

/* ------------------------- Code solution ------------------------------- */
/**
 * @param {any} x
 * @return {number}
 */
function mySqrt(x) {
  if (x < 0 || isNaN(x) || typeof x !== 'number') return NaN;

  let left = 0;
  let right = x;
  let result = 1;

  while (left <= right) {
    let mid = left + Math.floor((right - left) / 2);
    if (mid * mid < x) {
      result = Math.max(mid, result); //用于记录最接近但不超过平方根的整数。
      left = mid + 1;
    } else if (mid * mid > x) {
      right = mid - 1;
    } else {
      return mid;
    }
  }

  return result;
}
