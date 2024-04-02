/**
 * @param {Object} element
 * @return {string}
 */

function serializeHTML(element, indent = '\t') {
  function helper(node, depth = 0) {
    if (typeof node === 'string') return `${indent.repeat(depth)}${node}`;

    return [
      `${indent.repeat(depth)}<${node.tag.toLowerCase()}>`,
      ...node.children.map((child) => helper(child, depth + 1)), // recurrsion heres
      `${indent.repeat(depth)}</${node.tag.toLowerCase()}>`,
    ].join('\n');
  }

  return helper(element);
}
