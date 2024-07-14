/**
 * const gen = inorderTraversal([1, [2, 3]]);
 * gen.next().value; // 1
 * gen.next().value; // 2
 * gen.next().value; // 3
 */

/**
 * @param {Array} arr
 * @return {Generator}
 */

/*************************** Solution1: yield + Recursion ***************************************************/
var inorderTraversal = function* (arr) {
  if (typeof arr !== 'object') yield arr;
  for (let i = 0; i < arr.length; i++) {
    yield* inorderTraversal(arr[i]);
  }
};
/*************************** Solution2: yield + DFS Inorder迭代 *********************************************/
var inorderTraversal = function* (arr) {
  const stack = [arr];

  while (stack.length > 0) {
    let curr = stack.pop();

    if (typeof curr !== 'object') {
      yield curr;
      continue;
    }
    for (let i = curr.length - 1; i >= 0; i--) {
      stack.push(curr[i]);
    }
  }
};
/*************************** Solution3: yield+.flat - 直接yield数组 *********************************************/
var inorderTraversal = function* (arr) {
  yield* arr.flat(Infinity);
};
