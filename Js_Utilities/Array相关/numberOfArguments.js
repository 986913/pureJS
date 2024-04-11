/**
  Implement a function numberOfArguments, to return the number of arguments it was called with. 
  Note that this value is the actual number of arguments, which can be more or less than the defined parameter count 
  (which is determined by Function.prototype.length).
**/

/*-------------------用例测试--------------------*/
numberOfArguments(); // 0
numberOfArguments(1); // 1
numberOfArguments(2, 3); // 2
numberOfArguments('a', 'b', 'c'); // 3

/*---------------- Code solution -------------------*/
/**
 * @param {...any} args
 * @return {number}
 */
function numberOfArguments(...args) {
  return args.length;
}
