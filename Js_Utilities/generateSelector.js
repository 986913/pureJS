/**
  Given a DOM tree and a target element, generate a valid selector to target it.
  For example, for a DOM tree like below
    <div>
      <p>BFE.dev</p>
      <div>
        is
        <p>
          <span>great. <button>click me!</button></span>
        </p>
      </div>
    </div>

  There could be more than 1 answer.
    let selector = generateSelector(root, target) // 'button'
    expect(root.querySelector(selector)).toBe(target)

    selector = generateSelector(root, target) // 'div > div > p > button'
    expect(root.querySelector(selector)).toBe(target)

 */

/* -------------------------- Code Solution 1: while 迭代 -------------------------------- */
/**
 * @param {HTMLElement} root
 * @param {HTMLElement} target
 * @return {string}
 */

function generateSelector(root, target) {
  if (target.id) return `#${target.id}`;

  let currentNode = target;
  const path = [];

  while (currentNode !== root) {
    path.unshift(currentNode.tagName.toLocaleLowerCase());
    currentNode = currentNode.parentElement; // update currentNode to its parent here
  }

  return path.join('>');
}
