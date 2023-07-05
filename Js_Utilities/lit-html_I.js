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

/* -------------------------- Code Solution: -------------------------------- */
const html = (statics, ...dynamicValues) =>
  statics.map((statics, i) => `${statics}${dynamicValues[i] ?? ''}`).join('');

const render = (result, container) => {
  container.innerHTML = result;
};

/*
  html is an Tag Function here  ：
    这种参数的设计允许我们在标签函数中处理模板字面量的内容，将静态字符串和表达式的值组合起来，最终生成所需的结果。

  当我们使用string template调用html函数时，模板字面量的内容将被分解成两个参数传递给html函数:
    第一个参数是一个数组，包含了所有静态字符串片段（即没有表达式的部分)
    第二个参数是一个不定数量的参数，包含了模板字面量中的表达式的值

  举个例子1：
    const template = (name, title) => html`i am ${name}, my job is ${title}`
    template('ming', 'SDE')
      那么html函数中:
        segements是数组：["i am", ", my job is ", ""]
        values是数组：   ["ming", "SDE"]
  举个例子2: 结果和例子1一样，只不过call html时候直接给变量赋值了(没被function包住而已）
    const name2='ming'; const title2='SDE';
    html`i am ${name2}, my job is ${title2}`
*/

/**
  ?? 是一个空值合并运算符（nullish coalescing operator):
    如果dynamicValues[i]的值不为null或undefined，则表达式${dynamicValues[i] ?? ''} 将返回dynamicValues[i]的值。
    如果dynamicValues[i]的值为null或undefined，  则表达式${dynamicValues[i] ?? ''} 将返回空字符串''作为默认值。
 */
