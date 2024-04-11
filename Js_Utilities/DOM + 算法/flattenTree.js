/**
  Given a DOM tree, flatten it into an one dimensional array, in the order of layer by layer, like below.
                <div>
              /   |   \
            p     p     p
          /       |     /\
        button    a    p  div
                  |         \
                  img        p
                              \
                              button
*/

/*---------------------- Solution: BFS ----------------------- */
function flatten(root) {
  if (!root) return [];

  let queue = [root];
  let visited = [];

  while (queue.length) {
    let node = queue.shift();
    visited.push(node);
    for (let child of node.children) {
      queue.push(child);
    }
  }

  return visited;
}
