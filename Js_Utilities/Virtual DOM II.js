/**
  This is a follow up on Virtual DOM I
  Suppose you have solved above problem, now let's take a look at [React.createElement()](https://reactjs.org/docs/react-api.html#createelement):
    React.createElement(
      type,
      [props],
      [...children]
    )
  1. First argument is type, it could be set to Custom Component, but here in this problem, it would only be HTML tag name
  2. Second argument is props, here in this problem, it would only be the (common) camelCased HTML attributes
  3. the rest arguments are the children, which in React supports many data types, but in this problem, it only has the element type of MyElement, or string for TextNode.
  
  You are asked to create your own createElement() and render(), so that following code could create the exact HTMLElement in 113. Virtual DOM I.
    const h = createElement
    render(h(
      'div',
      {},
      h('h1', {}, ' this is '),
      h(
        'p',
        { className: 'paragraph' },
        ' a ',
        h('button', {}, ' button '),
        ' from ',
        h('a', 
          { href: 'https://bfe.dev' }, 
          h('b', {}, 'BFE'),
          '.dev')
      )
    ))
  
  Notes:
    1. The goal of this problem is not to create the replica of React implementation, you can have your own object representation format other than the one in [113. Virtual DOM I](https://bigfrontend.dev/problem/Virtual-DOM-I).
    2. Details about ref, key are ignored here, they will be put in other problems. Re-render is not covered here, it will be in another problem as well.
 */
/* ---------------------- 用例测试  ------------------------- */
const h = createElement;
const json = h(
  'div',
  {},
  h('h1', {}, ' this is '),
  h(
    'p',
    { className: 'paragraph' },
    ' a ',
    h('button', {}, ' button '),
    ' from ',
    h('a', { href: 'https://bfe.dev' }, h('b', {}, 'BFE'), '.dev')
  )
);
const html = render(json);
expect(virtualize(html)).toEqual({
  type: 'div',
  props: {
    children: [
      {
        type: 'h1',
        props: {
          children: ' this is ',
        },
      },
      {
        type: 'p',
        props: {
          className: 'paragraph',
          children: [
            ' a ',
            {
              type: 'button',
              props: {
                children: ' button ',
              },
            },
            ' from ',
            {
              type: 'a',
              props: {
                href: 'https://bfe.dev',
                children: [
                  {
                    type: 'b',
                    props: {
                      children: 'BFE',
                    },
                  },
                  '.dev',
                ],
              },
            },
          ],
        },
      },
    ],
  },
});

/* ------------------------------- Code solution ------------------------------------- */
/**
 * MyElement is the type your implementation supports
 * type MyNode = MyElement | string
 */
/**
 * @param { string } type - valid HTML tag name
 * @param { object } [props] - properties.
 * @param { ...MyNode} [children] - elements as rest arguments
 * @return { MyElement }
 */
function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children,
    },
  };
}

/**
 * @param {object} valid object literal presentation
 * @return {HTMLElement}
 *  🟡 exactly same as Virtial DOM I 的render方法
 */
function render(myElement) {
  // if myElement is text node, then return create text node
  if (typeof myElement === 'string') return document.createTextNode(myElement);

  // if myElement is element, then need construct element and return it
  const {
    type,
    props: { children, ...attrs },
  } = myElement;
  const element = document.createElement(type);
  for (let [attrname, value] of Object.entries(attrs)) {
    element[attrname] = value;
  }
  const childrenArr = Array.isArray(children) ? children : [children];
  for (let child of childrenArr) {
    element.append(render(child)); // 👈 recursion here to build childrens
  }
  return element;
}
