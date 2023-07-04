/**
  According to lit-html homepage, lit-html lets you write HTML templates in JavaScript, then efficiently render and re-render those templates together with data to create and update DOM

  import {html, render} from 'lit-html'
  const helloTemplate = (name) => html`<div>Hello ${name}!</div>`
  render(helloTemplate('Steve'), document.body)   // This renders <div>Hello Steve!</div> to the document body
  render(helloTemplate('Kevin'), document.body);  // This updates to <div>Hello Kevin!</div>, but only updates the ${name} part

  The magic happens in the second call of render() which only updates the necessary parts.
  But there will be a series of problems on BFE.dev leading to that, here you are asked to :
    implement html() and render() to make above example work, without considering the rerender, so html() could just return the raw HTML string.
  The input data are all valid.
 */

/* -------------------用例测试 --------------------*/

/* -------------------------- Code Solution: -------------------------------- */
