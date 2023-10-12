/* reverse iterate a simple hashmap and display its key values. */

class ReverseIterator {
  constructor(elements) {
    this.values = Object.entries(elements).map((item) => item[1]);
    this.index = this.values.length - 1;
  }
  previous() {
    return this.values[--this.index];
  }
  hasprevElement() {
    return this.index >= 0;
  }
  last() {
    this.index = this.values.length - 1;
    return this.values[this.index];
  }
}

function reverseIterate(items) {
  let iterator = new ReverseIterator(items);
  for (
    let item = iterator.last();
    iterator.hasprevElement();
    item = iterator.previous()
  ) {
    console.log(item);
  }
}

/** --------------------------- 用例测试 ------------------------------- **/
reverseIterate({
  name: 'Anne',
  age: '23',
  gender: 'Female',
  Occupation: 'Engineer',
}); // "Engineer" "Female" "23" "Anne"
