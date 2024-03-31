/* -------------------用例测试1--------------------*/
// <button class="foo bar">Click me</button>
$('button').toggleClass('bar'); // <button class="foo">Click me</button>
$('button').addClass('baz'); // <button class="foo baz">Click me</button>
$('button').removeClass(' foo '); // <button class="baz">Click me</button>
$('button').toggleClass('bar'); // <button class="baz bar">Click me</button>
$('button').addClass(' bar2 bar3 '); // <button class="baz bar bar2 bar3">Click me</button>

/* -------------------用例测试2--------------------*/
// <button class="foo bar">Click me</button>
$('button')
  .toggleClass('bar')
  .addClass('baz')
  .removeClass(' foo ')
  .toggleClass('bar')
  .addClass(' bar2 bar3 ');
// <button class="baz bar bar2 bar3">Click me</button>

/* -------------------------- Code Solution -------------------------------- */
/**
 * @param {string} selector
 * @return {{toggleClass: Function, addClass: Function, removeClass: Function}}
 */

//因为传入的className可能是常见的"foo", 也可能是"foo bar"或者"   foo bar   ", 所以要进行trim，按照一个或多个空格分割处理
const classNamesSet = (className) => new Set(className.trim().split(/ +/));

function $(selector) {
  const element = document.querySelector(selector);

  return {
    /**
     * @param {string} className
     * @param {boolean} state
     * @return {Object|void}
     */
    toggleClass: function (className, state) {
      //edge case
      if (!element) return undefined;

      //对函数传入的className进行处理
      const classes = classNamesSet(className);
      //对element本身已有的className进行处理
      const elementClasses = classNamesSet(element.className);

      //更新elementClasses
      classes.forEach((cls) => {
        const shouldRemove =
          state === undefined ? elementClasses.has(cls) : !state;

        shouldRemove ? elementClasses.delete(cls) : elementClasses.add(cls);
      });

      //把更新好的elementClasses重新assign给element本身
      element.className = [...elementClasses].join(' ');

      return this;
    },

    /**
     * @param {string} className
     * @return {Object}
     */
    addClass: function (className) {
      this.toggleClass(className, true);
      return this;
    },

    /**
     * @param {string} className
     * @return {Object}
     */
    removeClass: function (className) {
      this.toggleClass(className, false);
      return this;
    },
  };
}

/**
 * 知识点：
 * 1. domElement.className返回的不是数组，是string, 如果这个domElement有多个css classes（"class1" and "class2"）. 那么domElement.className返回就是“class1 class2”
 * 2.
 */
