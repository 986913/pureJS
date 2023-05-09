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

/* -------------------------- Code Solution - lc 100(is same tree变形题)-👍 DFS post_order recursion-------------------------------- */
/*
// 1. recurison params: 2 tree node:p and q, return boolean
var isSameTree = function (p, q) {
  //2. make sure when recursion ends:
  if (!p && q) return false;
  else if (p && !q) return false;
  else if (!p && !q) return true;
  else if (p.val !== q.val) return false;

  //3. recursion single layer logic (when p.val===q.val)
  let isLeftSideSame = isSameTree(p.left, q.left);
  let isRightSideSame = isSameTree(p.right, q.right);
  return isLeftSideSame && isRightSideSame;
};
*/

/**
 * @param {Node} nodeA
 * @param {Node} nodeB
 * @return {boolean}
 */

//step 1.  recursion params: two treenode,  return boolean
function isSameTree(nodeA, nodeB) {
  /* step2: make sure when recurrsion ends, below are cases: */
  if (nodeA.nodeType !== nodeB.nodeType) return false;
  if (nodeA.nodeType === Node.TEXT_NODE) {
    return nodeA.textContent === nodeB.textContent;
  }
  if (nodeA.childNodes.length !== nodeB.childNodes.length) return false;
  if (nodeA.attributes.length !== nodeB.attributes.length) return false;
  const hasSameAttributes = nodeA
    .getAttributeNames()
    .every(
      (attrName) =>
        nodeA.getAttribute(attrName) === nodeB.getAttribute(attrName)
    );
  if (!hasSameAttributes) return false;

  /* step3: start recursion single layer logic:
    because we don't know how may of the current node's children amount.  so we can iterate childrens instead of node.left,node right(leetcode100), and pass in childA and nodeB.childNodes[index] to recurrsion 👒*/
  return Array.from(nodeA.childNodes).every((childA, index) => {
    return isSameTree(childA, nodeB.childNodes[index]);
  });
}
