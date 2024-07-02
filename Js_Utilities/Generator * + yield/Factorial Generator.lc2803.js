/**
 * @param {number} n
 * @yields {number}
 */
function* factorial(n) {}

/**
 * const gen = factorial(2);
 * gen.next().value; // 1
 * gen.next().value; // 2
 */
/**
 * @param {number} n
 * @yields {number}
 */
/*************************** Solution: yield + while ****************************/
function* factorial(n) {
  if (n === 0) return 1;
  let curr = 1;
  let product = 1;

  while (curr <= n) {
    yield product;
    curr++;
    product *= curr;
  }
}
