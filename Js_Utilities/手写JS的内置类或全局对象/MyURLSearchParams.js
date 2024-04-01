/**
  When we want to extract parameters from query string, [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) could be very handy.
  Can you implement `MyURLSearchParams` which works the same ?
  There are [a few methods](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) on URLSearchParams, please implement them all.
 */

/* -------------------用例测试 1--------------------- */
const params = new MyURLSearchParams('?a=1&a=2&b=2');
params.get('a'); // '1'
params.getAll('a'); // ['1', '2']
params.get('b'); // '2'
params.getAll('b'); // ['2']
params.append('a', 3);
params.set('b', '3');
params.toString(); // 'a=1&a=2&b=3&a=3'
/* -------------------用例测试 2--------------------- */
const params2 = new MyURLSearchParams('?a=1&b=2');
params2.get('a'); // '1'
params2.get('b'); // '2'
/* -------------------用例测试 3--------------------- */
const params3 = new MyURLSearchParams('a=1&b=2');
params3.get('a'); // '1'
params3.get('b'); // '2'
/* -------------------用例测试 4--------------------- */
const params4 = new MyURLSearchParams('https://google.com?a=1&b=2');
params4.get('https://google.com?a'); // '1'
params4.get('b'); // '2'
/* -------------------用例测试 5--------------------- */
const params5 = new MyURLSearchParams('?a=1&b=2');
params5.append('a', '2');
params5.getAll('a'); //['1', '2']
/* -------------------用例测试 6--------------------- */
const params6 = new MyURLSearchParams('?a=1&b=2');
params6.append('a', new Map());
params6.append('a', undefined);
params6.append('a', NaN);
params6.getAll('a'); //['1','[object Map]', 'undefined', 'NaN']
/* -------------------用例测试 7--------------------- */
const params7 = new MyURLSearchParams('?a=1&a=1&b=2');
params7.delete('a');
params7.get('a'); //null
/* -------------------用例测试 8--------------------- */
const params8 = new MyURLSearchParams('?a=1&a=1&a=2&b=2');
const entries = params.entries();
entries.next(); //{ done: false, value: ['a', '1'] }
entries.next(); //{ done: false, value: ['a', '1'] }
entries.next(); //{ done: false, value: ['a', '2'] }
entries.next(); //{ done: false, value: ['b', '2'] }
entries.next(); //{ done: true, value: undefined }
/* -------------------用例测试 9--------------------- */
const params9 = new MyURLSearchParams('?a=1&a=1&a=2&b=2');
const log = jasmine.createSpy();
params9.forEach((value, key) => {
  log(value, key);
});
expect(log.calls.allArgs()).toEqual([
  ['1', 'a'],
  ['1', 'a'],
  ['2', 'a'],
  ['2', 'b'],
]);
/* -------------------用例测试 10--------------------- */
const params10 = new MyURLSearchParams('?a=2&a=1&a=2&b=2');
params.has('a'); //true
params.has('c'); //false
/* -------------------用例测试 11--------------------- */
const params11 = new MyURLSearchParams('?a=2&a=1&a=2&b=2');
params11.set('a', '3');
params11.set('b', new Map());
params11.set('c', false);
params11.get('a'); // '3'
params11.get('b'); //'[object Map]'
params11.get('c'); //'false'
/* -------------------用例测试 12--------------------- */
const params12 = new MyURLSearchParams('c=2&a=2&a=1&a=2&b=2');
[...params12.entries()];
/*
  [
    ['c', '2'],
    ['a', '2'],
    ['a', '1'],
    ['a', '2'],
    ['b', '2'],
  ];
*/
params12.sort();
[...params12.entries()];
/*
  [
    ['a', '2'],
    ['a', '1'],
    ['a', '2'],
    ['b', '2'],
    ['c', '2'],
  ]
*/
/* -------------------用例测试 13--------------------- */
const params13 = new MyURLSearchParams('?c=2&a=2&a=1&a=2&b=2');
params13.toString(); // 'c=2&a=2&a=1&a=2&b=2'
params13.delete('a');
params13.toString(); //'c=2&b=2'
/* -------------------用例测试 14--------------------- */
const params14 = new MyURLSearchParams('?c=2&a=2&a=1&a=2&b=2');
[...params14.values()]; //['2', '2', '1', '2', '2']
params14.sort();
[...params14.values()]; // ['2', '1', '2', '2', '2']

/* ------------------------ Code solution ----------------------------- */
class MyURLSearchParams {
  /**
   * @params {string} init
   */
  constructor(init) {
    this.params = init
      .replace(/^\?/, '') //将字符串中开头的问号去除掉, eg1: ?a=1&b=2 --> a=1&b=2   eg2: https://google.com?a=1&b=2不变， 因为其中的它的?没有打头，不符合正则
      .split('&')
      .map((param) => param.split('='));
  }

  /**
   * @params {string} name
   * @params {any} value
   */
  append(name, value) {
    this.params.push([name, String(value)]);
  }

  /**
   * @params {string} name
   */
  delete(name) {
    this.params = this.params.filter((param) => param[0] !== name);
  }

  /**
   * @returns {Iterator} - 迭代器
   */
  // * 代表生成器，常和yield搭配
  *entries() {
    for (let i = 0; i < this.params.length; i++) {
      yield [this.params[i][0], this.params[i][1]];
    }
  }

  /**
   * @param {(value, key) => void} callback
   */
  forEach(callback) {
    this.params.forEach((param) => {
      callback.apply(this, [param[1], param[0]]);
    });
  }

  /**
   * @param {string} name
   * returns the first value of the name
   */
  get(name) {
    return this.params.find((param) => param[0] === name)?.[1] || null;
  }

  /**
   * @param {string} name
   * @return {string[]}
   * returns the value list of the name
   */
  getAll(name) {
    return this.params
      .filter((param) => param[0] === name)
      .map((param) => param[1]);
  }

  /**
   * @params {string} name
   * @return {boolean}
   */
  has(name) {
    return this.params.some((param) => param[0] === name);
  }

  /**
   * @return {Iterator}
   */
  keys() {
    return this.params.map((param) => param[0]);
  }

  /**
   * @param {string} name
   * @param {any} value
   */
  set(name, value) {
    const exists = this.params.some((param) => {
      if (param[0] !== name) return false;

      param[1] = String(value);
      return true;
    });

    if (!exists) {
      this.append(name, value);
    }
  }

  // sort all key/value pairs based on the keys
  sort() {
    this.params.sort((a, b) => {
      if (a[0] > b[0]) return 1;
      if (a[0] < b[0]) return -1;
      return 0;
    });
  }

  /**
   * @return {string}
   */
  toString() {
    return this.params.map((param) => param.join('=')).join('&');
  }

  /**
   * @return {Iterator} values
   */
  values() {
    return this.params.map((param) => param[1]);
  }
}
