/**
  给你一个整数number, 要创造出来从0到number的数组
 */
/*--------------------用例测试----------------------*/
produce(5); // [0,1,2,3,4,5]
produce(2); // [0,1,2]

/* ------------------ Solution Code 1: use Array map ---------------*/
const produce = (n) => Array.from({ length: n + 1 }).map((_, index) => index);

/* ------------------ Solution Code 2: while loop ---------------*/
const produce = (n) => {
  let result = [];

  let i = 0;
  while (i <= n) {
    result.push(i);
    i++;
  }

  return result;
};
