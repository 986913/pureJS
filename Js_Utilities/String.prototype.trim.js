/**
  [String.prototype.trim()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim) is commonly used when processing strings.
  It is very easy, can you implement your own one?
  There are many ways to do it, can you think of different approaches?
 */

/* -------------------用例测试--------------------- */
trim('a'); // "a"
trim('a   '); // "a"
trim('  ab '); // "ab"
trim(' a b '); // "a b"
trim(' aa     '); // "aa"

/* ------------------------ Code solution 1: linear search ------------------------ */
/**
 * @param {string} str
 * @return {string}
 */
const WHITESPACES = [' ', '', 's', '\t', '\n', '\u3000'];
function trim(str) {
  let wordStart = 0;
  let wordEnd = str.length;
  for (let i = 0; i < str.length; i++) {
    if (WHITESPACES.indexOf(str[i]) === -1) {
      wordStart = i;
      break;
    }
  }
  for (let j = str.length - 1; j >= 0; j--) {
    if (WHITESPACES.indexOf(str[j]) === -1) {
      wordEnd = j;
      break;
    }
  }
  return str.slice(wordStart, wordEnd + 1);
}

/* ------------------------ Code solution 2:  Reg expression ------------------------ */
function trim(str) {
  return str.replace(/^\s+|\s+$/g, '');
}
/*
    '/s' => it indicates single white space character
    '/s+' => here '+' is a greedy character that indicates one or more
          For example 'a+' signifies one or more a
    '^' indicates starting/leading characters of the expression
    '$' indicates end/trailing characters of the expression
    '|' similar to logical OR operator

    /^\s+|\s+$/ => characters matching with leading and trailing whitespaces
*/
