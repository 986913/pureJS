/**
  [What is Event Delegation?](https://bigfrontend.dev/question/What-is-Event-Delegation)

  Can you create a function which works like [jQuery.on()](https://api.jquery.com/on/), 
  that attaches event listeners to selected elements.

  In jQuery, selector is used to target the elements, in this problem, it is changed to a predicate function.

  1. [event.stopPropagation()](https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation) and [event.stopImmediatePropagation()](https://developer.mozilla.org/en-US/docs/Web/API/Event/stopImmediatePropagation) should also be supported.
  2. you should only attach one real event listener to the root element.
 */

/* ---------- 用例测试:在 document.body元素中的所有div上设置了一个click事件，并在点击时记录被点击的div -------------- 
    https://bigfrontend.dev/problem/event-delegation
*/
onClick(
  document.body, // root element
  (el) => el.tagName.toLowerCase() === 'div', // predicate function
  function (e) {
    console.log(this);
  }
);

/* -------------------------- Code Solution 1: BFS -------------------------------- */
/**
 * @param {HTMLElement} root
 * @param {(el: HTMLElement) => boolean} predicate
 * @param {(e: Event) => void} handler
 */
function onClick(root, predicate, handler) {
  let queue = [root];
  while (queue.length) {
    let node = queue.shift();
    if (predicate(node)) {
      node.addEventListener('click', handler);
    }

    for (const child of node.children) {
      queue.push(child);
    }
  }
}

/* -------------------------- Code Solution 2: DFS -------------------------------- */
function onClick(root, predicate, handler) {
  const traversal = (node) => {
    if (!node) return;

    //前序位置
    if (predicate(node)) {
      node.addEventListener('click', handler);
    }
    for (let child of node.children) {
      traversal(child);
    }
  };

  traversal(root);
}

/* -------------------------- Code Solution 3: DOM traversal - TreeWalker -------------------------------- */
function onClick(root, predicate, handler) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT);
  let currNode = walker.currentNode;

  while (currNode) {
    if (predicate(currNode)) {
      currNode.addEventListener('click', handler);
    }
    currNode = walker.nextNode();
  }
}

/** 
知识点：
  stopPropagation VS stopImmediatePropagationz:
    stopPropagation会停止事件冒泡或事件捕获，阻止事件继续向上或向下传递，但不会影响其他事件处理程序的执行。
    stopImmediatePropagation不仅停止事件传播，还会立即停止当前元素上其他事件处理程序的执行。
**/
