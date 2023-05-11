//Create a sum(), which makes following possible:
/*-------------------用例测试1--------------------*/
const summed = sum(1); // sum1 should be 1, but also sum1 should be an function
summed(2); //3
summed(3); //4
/*-------------------用例测试2--------------------*/
sum(1); //1
sum(1)(2); //3
sum(1)(2)(3); //6

/*---------------- Code solution -------------------*/
/**
 * @param {number} num
 * @param {number} currSum -- optional,用于保存当前的累加和
 */
function sum(num, currSum = 0) {
  const newCurrSum = num + currSum;

  // 定义新函数fn，用于累加求和
  const fn = (arg) => {
    return sum(arg, newCurrSum);
  };
  // 使用Symbol.toPrimitive定义fn的转换行为
  fn[Symbol.toPrimitive] = () => newCurrSum;

  // 返回新函数fn
  return fn;
}

//https://www.youtube.com/watch?v=ZI7ZipKedfI&t=43s&ab_channel=JSer
