/**
  A [Prime number](https://en.wikipedia.org/wiki/Prime_number) is a natural number greater than 1 that is divisible only by itself and 1, such as 2,3,5....
  You are asked to implement `isPrime()` to check if a number is prime.

  Follow-up: What is the time cost of your implementation ? can you improve your approach to have the fewest comparisons?
 */
/*-------------------- 用例测试 -------------------------*/
isPrime(1); // false
isPrime(2); // true
isPrime(3); // true
isPrime(4); // false
isPrime(5); // true
isPrime(6); // false
isPrime(7); // true
isPrime(8); // false
isPrime(100); // false
isPrime(1115); // false
isPrime(9973); // true

/* -------------------------- Code Solution 1: for loop -------------------------------- */
/**
 * @param {number} num - positive integer
 */
function isPrime(num) {
  if (num === 1) return false;

  for (let i = 2; i < num; i++) {
    if (num % i === 0) return false;
  }

  return true;
}

/* -------------------------- Code Solution 2: 优化版for loop -------------------------------- */
function isPrime(num) {
  if (num === 1) return false;

  const max = Math.round(Math.sqrt(num));

  for (let i = 2; i <= max; i++) {
    if (num % i === 0) return false;
  }

  return true;
}
