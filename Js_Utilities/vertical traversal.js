/**
  Traverse a binary tree vertically from left to right, from top to bottom, the binary tree contains positive integers as node values.
  If two nodes are at the same position, their order should inherit from their parent node. For example, 9 and 10 are at the same position, since 7 is before 8, so 9 should be before 10：
                      1
                    /   \
                  2       3
                /           \
              4               5
            /    \          /
          6       7        8
                    \     /
                      9 10
    
    垂直遍历, 输出: [6,4,2,7,1,9,10,3,8,5]
 */

/* ------------------------------- Code solution ------------------------------------- */
// This is the class for the node
// you can use this directly as it is bundled with your code

// class Node {
//   value: number
//   left: null | Node
//   right: null | Node
//   constructor(val) {
//     this.value = val
//     this.left = null
//     this.right = null
//   }
// }
/**
 * @param {Node} root
 * @returns {number[]}
 */

function traverse(root) {
  if (!root) return [];

  // queue其中每一项是[node, colIdx]   (root的colIdx为0，root左边的colIdx为负值，右边colIdx为正值)
  let queue = [[root, 0]];
  const visitedMap = new Map();
  /**
   * 最终visitedMap长这样, 用于存储每个列索引对应的所有节点值列表:
      {
        -3:   [6],
        -2:   [4],
        -1:   [2,7],
        0:    [1, 9, 10],
        1:    [3,8],
        2:    [5]
      }
   */

  //用于记录已visited节点的最小列索引和最大列索引，以便后续生成最终的结果数组。
  let min = Infinity;
  let max = -Infinity;

  while (queue.length) {
    let len = queue.length;
    queue.sort((a, b) => a[1] - b[1]); //按照列colIdx从小到大排列；为了保证在进行垂直遍历时，按照从左到右的顺序访问每一列的节点。

    for (let i = 0; i < len; i++) {
      const [node, colIdx] = queue.shift();
      visitedMap.set(colIdx, [...(visitedMap.get(colIdx) || []), node.value]); //把当前node.value加到v isitedMap对应colIdx的value数组中

      if (node.left) {
        queue.push([node.left, colIdx - 1]); // 左边就colIdx-1
        min = Math.min(min, colIdx - 1); // update min
      }
      if (node.right) {
        queue.push([node.right, colIdx + 1]); // 右边就colIdx+1
        max = Math.max(max, colIdx + 1); // update max
      }
    }
  }

  const result = [];
  for (let i = min; i <= max; i++) {
    result.push(visitedMap.get(i));
  }

  return result.flat();
}

/* BFS模版: 结果是2维数组时:

  const levelOrder = (root) => {
    if (root === null) return [];

    // let depth=0; //optional: 记录tree总共有多少层。。
    let visited = [];
    let queue = [root];

    //每进一次while就是一层
    while (queue.length) {
      let len = queue.length; //记录当前层的节点数
      let curLevel = []; //curLevel用于存放每一层的节点
      // depth++  //optional: 每进一次while循环就是进入了新的一层。。

      // 每进一次forloop就是遍历每一层的nodes, queue弹出(shift)len个, 并且开始加(push)下一层的节点 
      for (let i = 0; i < len; i++) {
        let node = queue.shift(); //弹出当前层的节点
        curLevel.push(node.val); // 更新curLevel

        if (node.left) queue.push(node.left); // 存放当前层的下一层的节点到queue
        if (node.right) queue.push(node.right); // 存放当前层的下一层的节点到queue
      }

      visited.push(curLevel); //把每一层的结果放到结果数组
    }

    return visited;
  };
  
*/
