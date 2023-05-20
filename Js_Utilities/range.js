/**
  Can you create a range(from, to) which makes following work?
  This is a simple one, could you think more fancy approaches other than for-loop?

  Notice that you are not required to return an array, but something iterable would be fine
 */

/*-----------------用例测试--------------------*/
for (let num of range(1, 4)) {
  console.log(num);
}
// 1
// 2
// 3
// 4

/* ---------------------------- Solution ------------------------------- */
/**
 * @param {integer} from
 * @param {integer} to
 */
function range(from, to) {
  let result = [];
  while (from <= to) {
    result.push(from);
    from++;
  }

  return result;
}
