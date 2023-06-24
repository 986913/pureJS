/**
  Can you transform(serialize) a binary tree into a string and restore(deserialize) a binary tree from the string? 
  Just like what [JSON.stringify()](https://bigfrontend.dev/problem/implement-JSON-stringify) and [JSON.parse()](https://bigfrontend.dev/problem/implement-JSON-parse) do. 
  Binary tree in this problem consists of value of integers.

  For example, for a tree from [91. invert a binary tree](https://bigfrontend.dev/problem/invert-a-binary-tree), 
  BFE.dev would serialize it to `[1,2,3,4,null,null,5,6,7,8,null,null,null,null,9]`
  But there are more ways of doing it rather than above, any would be fine as long as your `deserialize()` and `serialize()` work as a pair.
 */

/* ---------- 用例测试 ------------ */
const tree1 = // some tree
  expect(typeof serialize(tree1)).toBe('string');
const tree2 = deserialize(serialize(tree1));
expect(isIdentical(tree1, tree2)).toBe(true);

/* ------------------------------- Code solution ------------------------------------- */
/* This is the class for the node, you can use this directly as it is bundled with your code:
  class Node {
    value: number
    left: null | Node
    right: null | Node
    constructor(val) {
      this.value = val
      this.left = null
      this.right = null
    }
  }
*/
/**
 * @param {Node} root
 * @return {string}
 */
function serialize(root) {
  let visited = [];
  let queue = [root];

  while (queue.length) {
    let node = queue.shift();
    if (node) {
      visited.push(node.value);
      queue.push(node.left);
      queue.push(node.right);
    } else {
      visited.push('null');
    }
  }

  return visited.join();
}

/**
 * @param {string} str
 * @return {Node}
 * leetcode🟡108 变形题
 */
function deserialize(str) {
  const arr = str.split(',');
  return buildTree(arr);
}
// helper function for deserialize:
const buildTree = (arr) => {
  if (arr.length === 0) return null;

  let midIdx = Math.floor(arr.length / 2);
  if (arr[midIdx] === 'null') return null;

  let node = new Node(arr[midIdx]);
  node.left = buildTree(arr.slice(0, midIdx));
  node.right = buildTree(arr.slice(midIdx + 1));

  return node;
};
