/**
  Given an object which resembles a DOM tree, 
  implement a function that serializes the object into a formatted string with proper indentation 
  (one tab (\t character) per nesting level) and one tag per line.
 */
/* -------------------用例测试--------------------*/
const tree = {
  tag: 'body',
  children: [
    { tag: 'div', children: [{ tag: 'span', children: ['foo', 'bar'] }] },
    { tag: 'div', children: ['baz'] },
  ],
};

serializeHTML(tree);
// Output:
`<body>
  <div>
    <span>
      foo
      bar
    </span>
  </div>
  <div>
    baz
  </div>
</body>`;

/* -------------------------- Code Solution: Recursion -------------------------------- */
/**
 * @param {Object} element
 * @return {string}
 */
function serializeHTML(element, indent = '\t') {
  function traverse(element, depth = 0) {
    // recursion end here:
    if (typeof element === 'string') return `${indent.repeat(depth)}${element}`;

    return [
      `${indent.repeat(depth)}<${element.tag.toLowerCase()}>`,
      ...element.children.flatMap((child) => traverse(child, depth + 1)), // recurrsion heres
      `${indent.repeat(depth)}</${element.tag.toLowerCase()}>`,
    ].join('\n');
  }

  return traverse(element);
}
