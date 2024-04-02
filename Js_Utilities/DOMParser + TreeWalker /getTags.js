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

/*********************** Solution1: DFS recursive - 遍历思想 ***********************/
/**
 * @param {HTMLElement} tree
 * @return {string[]}
 */
function getTags(tree) {
  let visited = [];

  const traversal = (node) => {
    if (!node) return;

    //前序位置：
    const tagName = node.tagName.toLowerCase(); //.tagName是获取dom节点的标签名字
    if (!visited.includes(tagName)) visited.push(tagName);

    for (let child of node.children) {
      traversal(child);
    }
  };

  traversal(tree);
  return visited;
}

/*************************** Solution2: BFS ************************************/
function getTags(root) {
  if (!root) return [];

  let queue = [root];
  let visited = [];
  while (queue.length) {
    let node = queue.shift();

    let tagName = node.tagName.toLowerCase(); // <-- diff is here
    if (!visited.includes(tagName)) visited.push(tagName);

    for (let child of node.children) {
      queue.push(child);
    }
  }

  return visited;
}

/************************** Solution3: use TreeWalker **************************/
function getTags(tree) {
  let visited = [];

  let walker = document.createTreeWalker(tree, Node.ELEMENT_NODE);
  let cur = walker.currentNode;
  while (cur) {
    let tagName = cur.tagName.toLowerCase();
    if (!visited.includes(tagName)) visited.push(tagName);

    cur = walker.nextNode();
  }

  return visited;
}
