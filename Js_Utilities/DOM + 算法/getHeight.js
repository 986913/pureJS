/**
  Height of a tree is the maximum depth from root node. Empty root node have a height of 0.
  If given DOM tree, can you create a function to get the height of it? For the DOM tree below, we have a height of 4:
  <div>
    <div>
      <p>
        <button>Hello</button>
      </p>
    </div>
    <p>
      <span>World!</span>
    </p>
  </div>

  Can you solve this both recursively and iteratively?
 */
/* -------------------用例测试--------------------*/
const tree = (
  <div>
    <div>
      <p>
        <button>Hello</button>
      </p>
    </div>
    <p>
      <span>World!</span>
    </p>
  </div>
);
getHeight(tree); // 4

/*********************************** Solution1: DFS Post-order Recursive : 分解思想 *************************************/
function getHeight(tree) {
  const helper = (node) => {
    if (!node) return 0;

    let depth = 0;
    for (let child of node.children) {
      depth = Math.max(depth, helper(child));
    }
    //后序位置
    return depth + 1;
  };

  return helper(tree);
}

/*********************************** Solution2: DFS Post-order Recursive : 遍历思想 + 回溯 *************************************/
function getHeight(tree) {
  let height = 0;

  const traversal = (node, curDepth) => {
    if (!node) return 0;

    //前序位置
    curDepth += 1;
    height = Math.max(height, curDepth);

    for (let child of node.children) {
      traversal(child, curDepth);
    }
    //后序位置： backtracking
    curDepth -= 1;
  };

  traversal(tree, 0);
  return height;
}

/*********************************** Solution2: BFS *************************************/
function getHeight(tree) {
  if (!tree) return 0;

  let queue = [tree];
  let depth = 0;

  while (queue.length) {
    let len = queue.length;
    depth++;

    for (let i = 0; i < len; i++) {
      let node = queue.shift();
      for (let child of node.children) {
        queue.push(child);
      }
    }
  }

  return depth;
}
