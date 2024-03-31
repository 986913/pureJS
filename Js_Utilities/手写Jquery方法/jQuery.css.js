/* -------------------用例测试1--------------------*/
const buttonEl = $('button');
buttonEl.css('color', 'red');
buttonEl.css('backgroundColor', 'tomato');
buttonEl.css('fontSize', '16px');

/* -------------------用例测试2--------------------*/
$('button')
  .css('color', 'red')
  .css('backgroundColor', 'tomato')
  .css('fontSize', '16px');

/* -------------------------- Code Solution: (use closure) -------------------------------- */
/**
 * @param {string} selector
 * @return {{css: Function}}
 */

export default function $(selector) {
  const $ele = document.querySelector(selector);

  return {
    css: function (property, value) {
      if (!value) {
        if ($ele === null) return undefined;

        const val = $ele.style[property];
        return val === '' ? undefined : val;
      }

      if ($ele !== null) {
        $ele.style[property] = value;
      }

      return this; //to allow for method chaining
    },
  };
}


/* -------------------------- alternative Code Solution (use class) -------------------------------- */
class jQuery {
  constructor(selector) {
    this.element = document.querySelector(selector);
  }

  css(prop, value) {
    // Getter case.
    if (value === undefined) {
      // No matching elements.
      if (this.element == null) {
        return undefined;
      }

      const value = this.element.style[prop];
      return value === '' ? undefined : value;
    }

    // Setter case.
    if (this.element != null) {
      this.element.style[prop] = value;
    }

    return this;
  }
}

export default function $(element) {
  return new jQuery(element);
}