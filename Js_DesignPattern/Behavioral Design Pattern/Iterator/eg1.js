class Iterator {
  constructor(elements) {
    this.index = 0;
    this.elements = elements;
  }
  next() {
    return this.elements[this.index++];
  }
  hasNextElement() {
    return this.index <= this.elements.length;
  }
  first() {
    this.index = 0;
    return this.next();
  }
  // the each method itself uses the for loop. However, the client will not be able to see that. They’ll call the each method directly without knowing its underlying implementation
  each(func) {
    for (var item = this.first(); this.hasNextElement(); item = this.next()) {
      func(item);
    }
  }
}

/** --------------------------- 用例测试 ------------------------------- **/
function iterate() {
  var items = ['Yellow', 'Green', 'Blue'];
  var iter = new Iterator(items);
  iter.each(function (item) {
    console.log(item);
  });
}
iterate(); // 'Yellow', 'Green', 'Blue'
