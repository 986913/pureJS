/**
  Given an object which resembles a DOM tree, 
  implement a function that render the object into a formatted string with proper indentation 
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

render(tree);
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

/* -------------------------- Code Solution: Recursion - Virtual DOM I 变形题 -------------------------------- */
/**
 * @param {Object} element
 * @return {string}
 */
function render(element, indent = '\t') {
  const traverse = (obj, curdepth = 0) => {
    // recursion end here:
    if (typeof obj === 'string') return `${indent.repeat(curdepth)}${obj}`;

    return [
      `${indent.repeat(curdepth)}<${obj.tag.toLowerCase()}>`,
      ...obj.children.map((child) => traverse(child, curdepth + 1)), // <-- recurrsion here
      `${indent.repeat(curdepth)}</${obj.tag.toLowerCase()}>`,
    ].join('\n');
  };

  return traverse(element);
}
