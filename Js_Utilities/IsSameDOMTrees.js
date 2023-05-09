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

/* -------------------------- Code Solution - lc 100(is same tree)-👍 DFS post_order recursion-------------------------------- */

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
