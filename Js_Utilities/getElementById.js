/**
 * @param {Element} element
 * @param {string} id
 * @return {Element}
 */

/*---------------------- Solution1: Recursion ----------------------- */

// dfs, 每次都先从根结点一直往下直到叶子结点，再从下往上返回。
function getElementById(node, id) {
  if (!node) return null;
  if (node.id === id) return node;

  for (let i = 0; i < node.children.length; i++) {
    let found = getElementById(node.children[i], id);
    if (found) return found;
  }

  return null;
}

/*---------------------- Solution2: Iteration ----------------------- */
function getByElementId(node, id) {
  //遍历所有的Node
  while (node) {
    if (node.id === id) return node;
    node = nextElement(node);
  }
  return null;
}

function nextElement(node) {
  if (node.children.length) return node.children[0];
  if (node.nextElementSibling) return node.nextElementSibling;
  while (node.parentNode) {
    if (node.parentNode.nextElementSibling)
      return node.parentNode.nextElementSibling;
    node = node.parentNode;
  }
  return null;
}
