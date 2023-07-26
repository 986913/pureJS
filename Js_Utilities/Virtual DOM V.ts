/**
  This is a follow up on Virtual DOM IV - JSX 1
  Now in this problem, please modify your code to support following:
  1. Nesting elements
    <p><i>BFE.dev</i> is <b>cool</b>!</p>
    This means JSXChild needs to support JSXElement as well.
      JSXChild:
          JSXText
      +   JSXElement
  2. Functional Component
    As a convention, intrinsic HTML tags are lower cases and [Functional Components](https://bigfrontend.dev/problem/virtual-DOM-III-Functional-Component) have capitalized initials.
    const Heading = ({children, ...res}) => h('h1', res, ...children)
    <Heading>BFE.<i>dev</i></Heading>
 */
/* -------------------用例测试--------------------*/

/* -------------------------- Code Solution: -------------------------------- */
type JSXOpeningElement = {
  tag: string
}
type JSXClosingElement = {
  tag: string
}
type JSXChildren = Array<string | JSXElement>
type JSXElement= {
  openingElemet: JSXOpeningElement
  children: JSXChildren
  closingElement: JSXClosingElement
}


function parse(code: string): JSXElement {
  let currentIndex = 0;

  const goToNext = () => currentIndex += 1;

  const goUntil = (reg: RegExp) => {
    const start = currentIndex;

    while (currentIndex < code.length && !reg.test(code[currentIndex])) {
      currentIndex += 1;
    }
    return code.slice(start, currentIndex);
  };

  const goUntilNonWhitespace = () => goUntil(/\S/);

  const expect = (char: string) => {
    if (code[currentIndex] !== char) throw new Error('unexepcted token:' + code[currentIndex]);
  };

  const disabledCharactersInTagName = /<|>|\s|\//;

  // opening elements
  // (ignore spaces)
  // we expect first non-whitespace to be <
  // (ignore spaces)
  // expect name without <>
  // (ignore spaces)
  // expect >
  const parseOpeningElement = (): JSXOpeningElement => {
    goUntilNonWhitespace();
    expect('<');
    goToNext();
    goUntilNonWhitespace();
    const tag = goUntil(disabledCharactersInTagName);

    const element = {
      tag,
    };
    goUntilNonWhitespace();
    expect('>');
    goToNext();
    return element;
  };

  // recursively try parsing elements
  const parseChildren = (): JSXChildren => {
    const children = [];

    const text = goUntil(/<|>/);

    if (text.length > 0) children.push(text);

    const index = currentIndex;
    // if might be an element
    try {
      const element = parseElement();
      children.push(element);

      children.push(...parseChildren());
    } catch (e) {
      // when failed to parse element, restore the index
      currentIndex = index;
    }

    return children;
  };

  const parseClosingElement = () => {
    expect('<');
    goToNext();
    goUntilNonWhitespace();
    expect('/');
    goToNext();
    goUntilNonWhitespace();
    const tag = goUntil(disabledCharactersInTagName);
    const element = {
      tag,
    };
    goUntilNonWhitespace();
    expect('>');
    goToNext();
    return element;
  };

  const parseElement = () => {
    const openingElement = parseOpeningElement();
    const children = parseChildren();
    const closingElement = parseClosingElement();

    if (openingElement.tag !== closingElement.tag) {
      throw new Error('not matched');
    }

    return {
      openingElement,
      children,
      closingElement,
    };
  };

  const element = parseElement();

  // there should no more non-whitespace characters
  goUntilNonWhitespace();
  // there should not be any extra characters
  if (currentIndex !== code.length) {
    throw new Error('unexepcted token');
  }

  return element;
}


function generate(ast: JSXElement): string {
  const { openingElement, children } = ast;
  const finalTag = /[A-Z]/.test(openingElement.tag[0])
    ? openingElement.tag
    : `"${openingElement.tag}"`;
  if (children[0]) {
    return `h(${finalTag}, null, ${children
      .map((child) => {
        // if string
        if (typeof child === 'string') {
          return `"${child}"`;
        }
        // if JSXELement
        return generate(child);
      })
      .join(',')})`;
  } else {
    return `h(${finalTag}, null)`;
  }
}
