/**
 * @param {HTMLElement} rootA
 * @param {HTMLElement} rootB - rootA and rootB are clone of each other
 * @param {HTMLElement} nodeA
 */

/**
  Given two same DOM tree A, B, and an Element a in A, find the corresponding Element b in B.
  By corresponding, we mean a and b have the same relative position to their DOM tree root.

  follow up:
    This could be a problem on general Tree structure with only `children`.
    Could you solve it recursively and iteratively?
    Could you solve this problem with special DOM api for better performance?
    What are the time cost for each solution?
 **/

/* ---------------用例测试 1 ----------------- */
const A = document.createElement('div');
const B = A.cloneNode(true);
findCorrespondingNode(A, B, A); // B;
/* ---------------用例测试 2 ----------------- */
const A = document.createElement('div');
A.setAttribute('id', '#rootA');
A.innerHTML = `
<div>
  <div>
    <div>
      <div id="node1"></div>
    </div>
    <div>
    </div>
    <div>
      <div>
        <p id="node2"></p>
      </div>
    </div>
  <div>
</div>
`;
const B = A.cloneNode(true);
const target = A.querySelector('#node1');
/* 这个函数的作用是在两个DOM树中找到与给定目标节点target对应的节点。它接受两个参数 rootA 和 rootB，分别表示两个 DOM 树的根节点 */
findCorrespondingNode(A, B, target); //  B.querySelector('#node1')

/*********************************** Solution1: DFS Recursion *************************************/
const findCorrespondingNode = (rootA, rootB, target) => {
  const helper = (nodeA, nodeB) => {
    if (nodeA === target) return nodeB;

    for (let i = 0; i < nodeA.children.length; i++) {
      let childA = nodeA.children[i];
      let childB = nodeB.children[i];

      const found = helper(childA, childB);
      if (found) return found;
    }
  };

  return helper(rootA, rootB);
};

/*********************************** Solution2: BFS Iterative (BFS变形题，不同处用了俩queue) *************************************/
const findCorrespondingNode = (rootA, rootB, target) => {
  let queueA = [rootA];
  let queueB = [rootB];

  while (queueA.length) {
    let nodeA = queueA.shift();
    let nodeB = queueB.shift();

    if (nodeA === target) return nodeB; // found it

    for (let child of nodeA.children) {
      queueA.push(child);
    }
    for (let child of nodeB.children) {
      queueB.push(child);
    }
  }

  return null; // can not find
};
/**
 * BFS模版（结果是1D array时）：

    const levelOrder = (root) => {
      if (this.root === null) return [];

      let visited = [];
      let queue = [this.root];

      while (queue.length) {
        let node = queue.shift();
        visited.push(node.value);
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
      }

      return visited;
    };
 */

/*********************************** Solution3: Using Tree Walker API *************************************/
const findCorrespondingNode = (rootA, rootB, target) => {
  // 首先使用 document.createTreeWalker 方法创建了两个树遍历器 rootAWalker 和 rootBWalker，用于遍历两个DOM树, 这些遍历器被配置为仅显示元素节点（NodeFilter.SHOW_ELEMENT）
  const walkerA = document.createTreeWalker(rootA, NodeFilter.SHOW_ELEMENT);
  const walkerB = document.createTreeWalker(rootB, NodeFilter.SHOW_ELEMENT);

  //然后，函数初始化一个包含当前节点的数组curNodes，数组的第一个元素是walkerA的当前节点，第二个元素是walkerB的当前节点。
  let curNodes = [walkerA.currentNode, walkerB.currentNode];

  //函数进入一个循环，直到找到目标节点或者遍历完rootA的所有节点 (一旦找到目标节点，循环停止)
  while (curNodes[0] !== target) {
    curNodes = [walkerA.nextNode(), walkerB.nextNode()]; //调用walkerA.nextNode() 和walkerB.nextNode() 分别获取walkerA和walkerB的下一个节点，并将它们更新到curNodes数组中
  }

  return curNodes[1]; // 返回curNodes数组的第二个元素，即walkerB的当前节点，它就是在rootB中对应于目标节点target的节点。
};
/**
 * https://developer.mozilla.org/en-US/docs/Web/API/Document/createTreeWalker
 * 
 * document.createTreeWalker 是一个在 DOM 树中进行节点遍历的方法。它创建了一个 TreeWalker 对象，该对象可以在指定的 DOM 树中按照特定条件遍历节点。
 * createTreeWalker 方法接受三个参数:
 *    1. root：指定要遍历的 DOM 树的根节点。
 *    2. whatToShow：指定要显示的节点类型。它是一个位掩码，可以使用以下常量进行设置：
          NodeFilter.SHOW_ALL：显示所有节点类型。
          NodeFilter.SHOW_ELEMENT：仅显示元素节点。
          NodeFilter.SHOW_TEXT：仅显示文本节点。
          NodeFilter.SHOW_COMMENT：仅显示注释节点。
          NodeFilter.SHOW_PROCESSING_INSTRUCTION：仅显示处理指令节点。
          NodeFilter.SHOW_DOCUMENT：仅显示文档节点。
          NodeFilter.SHOW_DOCUMENT_TYPE：仅显示文档类型节点。
          NodeFilter.SHOW_DOCUMENT_FRAGMENT：仅显示文档片段节点。
      3. filter：一个可选的过滤器函数，用于进一步过滤要显示的节点。该函数接受一个节点作为参数，并返回以下常量之一：
          NodeFilter.FILTER_ACCEPT：接受当前节点并将其包含在遍历结果中。
          NodeFilter.FILTER_REJECT：拒绝当前节点，并将其子节点排除在遍历结果之外。
          NodeFilter.FILTER_SKIP：跳过当前节点的子节点。
          NodeFilter.FILTER_NODE：默认行为，接受当前节点并将其包含在遍历结果中。
*  通过调用 document.createTreeWalker 方法并传递相应的参数，我们可以创建一个 TreeWalker 对象，然后使用它的方法进行节点遍历。常用的 TreeWalker 方法包括：
      nextNode()：移动到下一个节点，并返回该节点。
      previousNode()：移动到上一个节点，并返回该节点。
      parentNode()：移动到当前节点的父节点，并返回该节点。
      firstChild()：移动到当前节点的第一个子节点，并返回该节点。
      lastChild()：移动到当前节点的最后一个子节点，并返回该节点。
    通过结合使用这些方法，我们可以在 DOM 树中进行深度优先的节点遍历，并对满足特定条件的节点执行相应的操作
 */
