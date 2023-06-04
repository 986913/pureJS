/**
  Given a DOM tree, please return all the tag names it has.
  Your function should return a unique array of tags names in lowercase, order doesn't matter.
 */
/* -------------------用例测试--------------------*/
getTags(createDOM('<div></div>')); // ['div']
getTags(createDOM('<div><div><p></p><button></button></div></div>')); // ['div', 'p', 'button']
getTags(
  createDOM(
    '<div><ol><li>1</li><li>2</li><li>3</li></ol><button>click</button></div>'
  )
); //['div', 'li', 'ol', 'button']

/* ---------------------------------- Code Solution 1: DFS recursive -------------------------------------- */
/**
 * @param {HTMLElement} tree
 * @return {string[]}
 */
function getTags(tree) {
  let visited = [];

  const dfs = (node) => {
    if (!node) return;

    const tagName = node.tagName.toLowerCase(); //.tagName是获取dom节点的标签名字
    if (!visited.includes(tagName)) visited.push(tagName);
    for (let child of node.children) {
      dfs(child);
    }
  };
  dfs(tree);

  return visited;
}

/* ----------------------------- Code Solution 2:  use TreeWalker ------------------------------------- */
/**
 * @param {HTMLElement} tree
 * @return {string[]}
 */
function getTags(tree) {
  const treeWalker = document.createTreeWalker(tree, NodeFilter.SHOW_ELEMENT);
  let result = new Set();
  let cur = treeWalker.currentNode;
  while (cur) {
    result.add(cur.tagName.toLowerCase());
    cur = treeWalker.nextNode();
  }
  return [...result];
}
