/**
  Given a DOM tree and a target element, please return the previous left sibling.
                              div
                            /  |  \
                          div div div
                          /\   |    \
                        p   p  p     p
                      /     |       / \
                    a     button   a   a

  Like above, the previous left sibling of green <a/> is the blue <button/>. Notice that they don't necessarily have the same parent element.
  If no left sibling, then return null.
  
  What is time & space cost of your solution ?
 */

/* ---------------------------- Solution: BFS ------------------------------- */
/**
 * @param {Element} root
 * @param {Element} target
 * @return {Elemnt | null}
 */
function previousLeftSibling(root, target) {
  if (!root) return null;

  let queue = [root];
  let prev = null; //<--- diff is here: define prev node as null first

  while (queue.length) {
    let len = queue.length;

    for (let i = 0; i < len; i++) {
      let node = queue.shift();

      //如果找到了target, 且位置是当前层的第一个节点，那么没有prev node. 返回null;
      if (node === target && i === 0) return null;
      //如果找到了target, 且有prev node. 返回prev noe
      if (node === target) return prev;

      for (let child of node.children) {
        queue.push(child);
      }
      prev = node; //<--- diff is here: update prev here
    }
  }
}
