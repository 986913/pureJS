/**
 * Currying 定义：
 * Currying is the technique of converting a function that takes multiple arguments into
 * a sequence of functions that each takes a single argument.
 */

/* --------------------- 用例测试 ----------------------- */
const multiply = (...numbers) => numbers.reduce((a, b) => a * b, 1);

const curried = curry(multiply);

const multiplyByThree = curried(3);
console.log(multiplyByThree); //3, 注意这里multiplyByThree不是function了
multiplyByThree(4); // 12， 但是multiplyByThree还能被当成function继续curry

const multiplyByFifteen = multiplyByThree(5); // 15
multiplyByFifteen(2); // 30
/*
  用例测试共同点：
  1. 被curry的函数，比如multiply函数没有确定的参数个数
  2. curry后的东西，比如multiplyByThree即是primitive type,又是function..🤔
*/

/* -------------------------------- Code solution ---------------------------------- */
/**
 * @param {Function} func
 * @return {Function}
 */

function curry(func) {
  return function curried(...args) {
    function fn(...args2) {
      return curried.apply(this, [...args, ...args2]);
    }
    // Define using an arrow function to preserve `this`.
    fn[Symbol.toPrimitive] = () => {
      return func.apply(this, args);
    };

    return fn;
  };
}

// reference: https://www.greatfrontend.com/questions/javascript/curry-iii
