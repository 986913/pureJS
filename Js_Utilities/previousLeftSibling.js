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

/* ---------------------------- Solution1: BFS ------------------------------- */
/**
 * @param {Element} root
 * @param {Element} target
 * @return {Elemnt | null}
 */
function previousLeftSibling(root, target) {
  if (!root) return null;

  let queue = [root];

  while (queue.length) {
    let len = queue.length;
    let prev = null; // define prev node as null first

    for (let i = 0; i < len; i++) {
      let node = queue.shift();

      //如果找到和target一样的node, 那么直接返回prev node
      if (node === target) return prev;

      for (let child of node.children) {
        queue.push(child);
      }

      prev = node; // update prev here
    }
  }
}
