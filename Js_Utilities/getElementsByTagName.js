/**
 * @param {Element} rootElement
 * @param {string} tagName
 * @return {Array<Element>}
 */

/*---------------------- Solution  ----------------------- */
function getElementsByTagName(rootElement, tagName) {
  const result = [];

  const helper = (node) => {
    if (!node) return;
    if (node.tagName === tagName.toUpperCase()) result.push(node);

    for (let i = 0; i < node.children.length; i++) {
      helper(node.children[i]);
    }
  };

  //  doesn't include itself
  for (let i = 0; i < rootElement.children.length; i++) {
    helper(rootElement.children[i]);
  }
  // helper(rootElement);  // include itself

  return result;
}
