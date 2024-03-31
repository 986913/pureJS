/** 
  Please create a function count(), when called it should return how many times it has been called, count.reset() should also implemented.
 */

/*-------------------用例测试--------------------*/
count(); // 1
count(); // 2
count(); // 3
count.reset();
count(); // 1
count(); // 2
count(); // 3

/* ---------------------  Code solution ----------------------- */
const count = () => {
  count.val = count.val || 1;
  return count.val++;
};

count.reset = function () {
  count.val = 1;
};

/**
  考点：你可以给函数添加任何property, 上面就显示了给count函数分别添加了val值和reset函数
 */
