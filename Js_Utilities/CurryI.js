/* --------------------- 用例测试1 ----------------------- */
const sum = (a, b) => a + b;

const curriedSum = curry(sum);
curriedSum(3)(4); // 7
curriedSum(3, 4); // 7
// const alreadyAddedThree = curriedSum(3);
// alreadyAddedThree(4); // 7

/* --------------------- 用例测试2 ----------------------- */
const multiplyThree = (a, b, c) => a * b * c;

const curriedMultiplyThree = curry(multiplyThree);
curriedMultiplyThree(4)(5)(6); // 120
curriedMultiplyThree(4, 5, 6); // 120
curriedMultiplyThree(4, 5), 6; // 120
curriedMultiplyThree(4), (5, 6); // 120
// const containsFour = curriedMultiplyThree(4);
// const containsFourMulFive = containsFour(5);
// containsFourMulFive(6); // 120

/* --------------------- 用例测试3 ----------------------- */
const join = (a, b, c) => `${a}_${b}_${c}`;

const curriedJoin = curry(join);
curriedJoin(1, 2, 3); // '1_2_3'
curriedJoin(1)(2, 3); // '1_2_3'
curriedJoin(1, 2)(3); // '1_2_3'

/* -------------------------------- Code solution ---------------------------------- */
/**
 * @callback func
 * @return {Function}
 */

function curry(func) {
  return function curried(...args) {
    //1. if enough args, call original func: func;
    if (args.length >= func.length) return func.apply(this, args);

    //2. if not enough args, return a function that invoke curried function with new arguments!!(通过闭包)
    return (...args2) => {
      // recursion here:
      return curried.apply(this, [...args, ...args2]);
    };
  };
}

/**
 * 知识点：
 * 1. 如何知道function的参数有多少个？---> function.length
 * 2. 这道题keypoint就是理解：
 *      The curried function will stop accepting arguments after the number of arguments have been passed into the curried function
 *      equals the arity of the original function (ie: the origianl function's amount of arguments)
 * 3. Invoking functions via Function.prototype.apply()/Function.prototype.call().
 * 4.
 */
