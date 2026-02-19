/**
  [String.prototype.split()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split) is commonly used when processing strings.
  It is very easy, can you implement your own one?
  There are many ways to do it, can you think of different approaches?
 */

/* -------------------用例测试--------------------- */
split('a b c', ' '); // ["a", "b", "c"]
split('a b  c', ' '); // ["a", "b", "", "c"]
split('a,b,c', ','); // ["a", "b", "c"]
split('ab c', ' '); // ["ab", "c"]
split('a-b-c', '-'); // ["a", "b", "c"]
split('a---c', '-'); // ["a", "", "", "c"]
