/*---------------------- Solution1: Pre-order DFS  ----------------------- */
/*This is the type for the node
  type Node = null | {
    value: number
    left: Node
    right: Node
  }
*/
/**
 * @param {Node} node
 * @returns {Node}
 */
function invert(root) {
  if (!root) return root;

  const helper = (node) => {
    if (!node) return;

    [node.left, node.right] = [node.right, node.left]; //中
    if (node.left) helper(node.left); //左
    if (node.right) helper(node.right); //右
  };

  helper(root);
  return root;
}

/*------------------------- Solution2: BFS  ----------------------- */
function invert(root) {
  if (!root) return root;

  let queue = [root];
  while (queue.length) {
    let node = queue.shift();
    [node.left, node.right] = [node.right, node.left];
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
}
