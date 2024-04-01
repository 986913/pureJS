/**
 * Implement a function `isSameTree` that checks if two DOM trees are identical or not. 
 * The function takes two DOM nodes as the root nodes of two DOM trees and returns a boolean result.
 * Two DOM trees are considered identical if they are structurally similar, and the DOM nodes on one tree have the exact same attributes as the nodes on the same relative position on the other tree.
 * 
 * Examples:
    Tree A and Tree B are considered the same:
      <!-- Tree A -->
      <div>Hello World</div>
      <!-- Tree B -->
      <div>Hello World</div>

    Tree C and Tree D are considered the different.
      <!-- Tree C -->
      <div class="header">Hello World</div>
      <!-- Tree D -->
      <div id="foo">Hello World</div>
 */

/* ------------------ Code Solution: LC100(isSameTree变形题) 👍 DFS postOrder recursion---------------- */
/*
var isSameTree = function (p, q) {
  if (!p && q) return false;
  if (p && !q) return false;
  if (!p && !q) return true;
  if (p.val !== q.val) return false;

  let isLeftSideSame = isSameTree(p.left, q.left);
  let isRightSideSame = isSameTree(p.right, q.right);
  return isLeftSideSame && isRightSideSame; // 后序位置
};
*/

/**
 * @param {Node} nodeA
 * @param {Node} nodeB
 * @return {boolean}
 */

/********************* Solution1: 👍👍👍 DFS PostOrder - Recursion 分解思想 *********************/

//step 1.  recursion params: two treenode,  return boolean
function identicalDOMTrees(nodeA, nodeB) {
  /* step2: make sure when recurrsion ends, below are cases: */
  if (!nodeA && !nodeB) return true;
  if (!nodeA && nodeB) return false;
  if (nodeA && !nodeB) return false;
  if (nodeA.nodeType !== nodeB.nodeType) return false;
  if (nodeA.tagName !== nodeB.tagName) return false;
  if (nodeA.nodeType === Node.TEXT_NODE) {
    return nodeA.textContent === nodeB.textContent;
  }
  if (nodeA.attributes.length !== nodeB.attributes.length) return false;
  for (let i = 0; i < nodeA.getAttributeNames().length; i++) {
    const attrNameA = nodeA.getAttributeNames()[i];
    const attrNameB = nodeB.getAttributeNames()[i];
    if (attrNameA !== attrNameB) return false;
    if (nodeA.getAttribute(attrNameA) !== nodeB.getAttribute(attrNameB))
      return false;
  }
  if (nodeA.childNodes.length !== nodeB.childNodes.length) return false;

  /* step3: start recursion single layer logic:
    because we don't know how may of the current node's children amount.  
    so we can iterate childrens instead of node.left,node right(LC100), 
    and pass in childA and childB to recurrsion */
  for (let i = 0; i < nodeA.childNodes.length; i++) {
    const childA = nodeA.childNodes[i];
    const childB = nodeB.childNodes[i];
    const isSubTreeSame = identicalDOMTrees(childA, childB);
    if (!isSubTreeSame) return false;
  }

  return true; // they are same tree
}
