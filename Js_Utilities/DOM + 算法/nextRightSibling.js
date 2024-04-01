/**
  Given a DOM tree and a target element, please return the next right sibling.
                          div
                        /  |  \
                    div   div   div
                    / \    \     \
                  p    p    p     p
                /       \        / \
              a        button   a   a 
  Like above, the next right sibling of `<button/>` is the blue `<a/>`. Notice that they don't necessarily have the same parent element.
  If no right sibling, then return `null`.

  What is time & space cost of your solution ?
 */

/* ------------------------------ Code solution: BFS ---------------------------- */
/**
 * @param {HTMLElement} root
 * @param {HTMLElement} target
 * @return {HTMLElemnt | null}
 */

function nextRightSibling(root, target) {
  if (!root) return null;

  let queue = [root];

  while (queue.length) {
    let len = queue.length;

    for (let i = 0; i < len; i++) {
      let node = queue.shift();
      //如果找到和target一样的node, 那么返回它的下一个节点：queue.shift()
      if (node === target) {
        return queue.shift() || null;
      }
      for (let child of node.children) {
        queue.push(child);
      }
    }
  }
}
