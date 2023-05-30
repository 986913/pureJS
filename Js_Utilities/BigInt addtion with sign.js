/**
  This is a follow-up on BigInt addition 
  You are asked to implement a string addition function, with possible negative integers. Also, '+' plus sign should also be supported

  Don't use BigInt directly, it is not our goal here.
 */
/* --------------------- 用例测试 ----------------------- */
add('-999999999999999999', '-1'); // '-1000000000000000000'
add('-999999999999999999', '+1'); // '-999999999999999998'
add('-1', '+1'); // 0
add('9', '+1'); // 10
add('9', '-1'); // 8
add('0', '-100'); // -100
add('-9', '-9'); // -18

/* ------------------ Code solution ------------------ */
/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
