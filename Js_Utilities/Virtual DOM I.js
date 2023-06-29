/**
  Suppose you have solved "serialize and deserialize binary tree", have you wondered how to do similar task to DOM tree ?
  HTML string could be thought as some sort of [serialization](https://en.wikipedia.org/wiki/Serialization), the browser parses(deserialize) the HTML → construct the DOM tree.
  Besides XML base, we could try JSON for this. If we log the element presentation in React, like below:
    const el = <div>
      <h1> this is </h1>
      <p className="paragraph"> a <button> button </button> from <a href="https://bfe.dev"><b>BFE</b>.dev</a> </p>
    </div>;
    console.log(el);
  we would get this( ref, key .etc are stripped off):
    {
      type: 'div',
      props: {
        children: [
          {
            type: 'h1',
            props: {
              children: ' this is '
            }
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
                    children: ' button '
                  }
                },
                ' from',
                {
                  type: 'a',
                  props: {
                    href: 'https://bfe.dev',
                    children: [
                      {
                        type: 'b',
                        props: {
                          children: 'BFE'
                        }
                      },
                      '.dev'
                    ]
                  }
                }
              ]
            }
          }
        ]
      }
    }
  Clearly this is the same tree structure but only in object literal.
  Now you are asked to serialize/deserialize the DOM tree, like what React does.

  Note:
    Functions like event handlers and custom components are beyond the scope of this problem, you can ignore them, just focus on basic HTML tags.

  You should support:
    TextNode (string) as children
    single child and multiple children
    camelCased properties.
    virtualize() takes in a real DOM tree and create an object literal render() takes in a object literal presentation and recreate a DOM tree.
*/

/* ---------------------- 用例测试 1 ------------------------- */
const html = document.createElement('div');
html.innerHTML = `<h1> this is </h1><p class="paragraph"> a <button> button </button> from <a href="https://bfe.dev"><b>BFE</b>.dev</a></p>`;
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
/* ---------------------- 用例测试 2 ------------------------- */
const json = {
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
};
const html = render(json);
expect(virtualize(html)).toEqual(json);

/* ------------------------------- Code solution ------------------------------------- */
/**
 * @param {HTMLElement}
 * @return {object} object literal presentation
 */
function virtualize(element) {
  // virtualize top level element
  const result = {
    type: element.tagName.toLowerCase(),
    props: { children: [] },
  };

  // update result.props with attribute etc, but without children
  for (let attr of element.attributes) {
    const name = attr.name === 'class' ? 'className' : attr.name;
    result.props[name] = attr.value;
  }
  // update result.props with children
  for (let child of element.childNodes) {
    //if child is text node
    if (child.nodeType === 3) {
      result.props.children.push(child.textContent);
    } else {
      //if child is html element, need
      result.props.children.push(virtualize(child)); // 👈 recursion here
    }
  }

  //last step to modify : result.props.children
  result.props.children =
    result.props.children.length === 1
      ? result.props.children[0]
      : result.props.children;
  return result;
}

/**
 * @param {object} valid object literal presentation
 * @return {HTMLElement}
 */
function render(obj) {
  // if obj is text node, then return create text node
  if (typeof obj === 'string') return document.createTextNode(obj);

  // if obj is element, then need construct element and return it
  const {
    type,
    props: { children, ...attrs },
  } = obj;
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
