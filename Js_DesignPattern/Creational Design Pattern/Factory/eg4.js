window.$ = function (selector) {
  return new jQuery(selector); /*工厂模式*/
};

class jQuery {
  constructor(selector) {
    let dom = Array.from(document.querySelectorAll(selector));
    let len = dom ? dom.length : 0;
    for (let i = 0; i < len; i++) {
      this[i] = dom[i];
    }

    this.length = len;
    this.selector = selector || '';
  }
  append() {}
  html() {}
  addClass() {}
  /* 此处省略n个API */
}

/** --------------------------- 用例测试 ------------------------------- **/
let p = $('p');

// NOTE: use p directly here, cuz $ return instance directly.
console.log(p); // jQuery {length: 0, selector: 'p'};
