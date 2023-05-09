/**
 * @param {Element} element
 * @param {string} classNames
 * @return {Array<Element>}
 */

/*---------------------- Solution  ----------------------- */
function getElementsByClassName(element, classNames) {
  const result = [];
  const classNamesArr = new Set(classNames.trim().split(/ +/));

  const helper = (node) => {
    if (!node) return;
    const isSubset = Array.from(classNamesArr).every((classname) =>
      node.classList.contains(classname)
    );
    if (isSubset) result.push(node);

    for (let i = 0; i < node.children.length; i++) {
      helper(node.children[i]);
    }
  };

  // not includes the element itself.
  for (let i = 0; i < element.children.length; i++) {
    helper(element.children[i]);
  }
  // helper(element) includes the element itself.

  return result;
}
