/**
  This is a follow-up on Virtual DOM II - createElement.
  In Virtual DOM II - createElement, you are asked to implement createElement() and render() function which supports intrinsic HTML elements, like <p/>, <div/> etc.

  In this problem, you are ask to support custom Functional Component.
  Functional Component are functions that:
    accept single object argument -props, which contains children, className and other properties.
    returns an MyElement by calling createElement().
  Say we have a Functional Component - Title
    ```
      const h = createElement
      const Title = ({children, ...res}) => h('h1', res, ...children)
    ```
  Then we should be able to use it in createElement and render(), just the same way as an intrinsic element.
    ```
      h(Title, {}, 'This is a title')
      h(Title, {className: 'class1'}, 'This is a title')
    ```
  Please modify your createElement() and render() from 118. Virtual DOM II - createElement if necessary, so that the example in problem 118 could be rewritten as below:
    ```
      const Link = ({children, ...res}) => h('a', res, ...children)
      const Name = ({children, ...res}) => h('b', res, ...children)
      const Button = ({children, ...res}) => h('button', res, ...children)
      const Paragraph = ({children, ...res}) => h('p', res, ...children)
      const Container =  ({children, ...res}) => h('div', res, ...children)
      h(
        Container,
        {},
        h(Title, {}, ' this is '),
        h(
          Paragraph,
          { className: 'paragraph' },
          ' a ',
          h(Button, {}, ' button '),
          ' from ',
          h(
            Link, 
            { href: 'https://bfe.dev' }, 
            h(Name, {}, 'BFE'), 
            '.dev')
        )
      )
  ```
 */

/* ------------------------------- Code solution ------------------------------------- */
/**
 * MyElement is the type your implementation supports
 *
 * type MyNode = MyElement | string
 * type FunctionComponent = (props: object) => MyElement
 *
/**
 * @param { string | FunctionComponent } type - valid HTML tag name or Function Component 
 * @param { object } [props] - properties.
 * @param { ...MyNode} [children] - elements as rest arguments
 * @return { MyElement }
*  🟡 exactly same as Virtial DOM II 的createElement方法
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
 *  🟡 minor change on Virtial DOM II 的render方法
 */
function render(myElement) {
  // if myElement is text node, then return create text node
  if (typeof myElement === 'string') return document.createTextNode(myElement);

  // if myElement is element, then need construct element and return it
  const { type, props } = myElement;
  const { children, ...attrs } = props;

  // Compared II, the difference is here 🟡👇  (if myElement is functional component)
  if (typeof type === 'function') return render(myElement.type(props)); // 👈 recursion here as well

  //if myElement is intrinsic html tag
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
