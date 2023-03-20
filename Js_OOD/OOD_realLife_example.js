class jQuery {
  constructor(selector) {
    let dom = Array.from(document.querySelectorAll(selector));
    let len = dom ? dom.length : 0;
    for (let i = 0; i < len; i++) {
      this[i] = dom[i];
    }
    this.length = len;
    this.length = selector || '';
  }

  append() {}
  html() {}
  addClass() {}
  //此处省略n个API。。
}

window.$ = function (selector) {
  //工厂模式
  return new jQuery(selector);
};

// let p = $("p");
