/**
  > Given a character sequence and a defined document unit, tokenization is the task of chopping it up into pieces, called tokens , perhaps at the same time throwing away certain characters, such as punctuation. ([ref](https://nlp.stanford.edu/IR-book/html/htmledition/tokenization-1.html))

  For tasks of string processing, in many cases we are given a string, and are asked to understand this string in specific logic and then return the result.
  For example, if we are to calculate the result of following expression:   `1 * (20 -   300      )`
  before we implement the logic, first we need to get the "keywords"(tokens) and ignore the spaces, like following: `'1','*', '(', '20', '-', '300', ')'`
  Then we can process above tokens and get the result easier.

  You are asked to implement a tokenize() for arithmetic expression , which works as below:
    const tokens = tokenize(' 1 * (20 -   300      ) ')
    while (true) {
      let token = tokens.next()
      if (token.done) {
        break
      }
      console.log(token.value)
    }
  or you can use for ... of
    for (let token of tokens) {
      console.log(token)   
    }
  Because it is trivial, in a real interview you talk to interviewer and implement tokenizer later, this could save yourself some time for more important tasks.

  Input:
    1. input only contains valid non-negative integers with `+`, ``, ``, `/`, `(`, `)` and spaces, space should be ignored.
    2. your method should return an [Generator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator) object.
 */

/* -------------------------- Soltion 1: use 正则 -------------------------------- */
/**
 * @param {string} str
 * @return {Generator}
 */
function* tokenize(str) {
  let s = str.replaceAll(' ', '');
  const tokens = s.match(/(\d+|[()+\-*/])/g);
  //  \d+ 表示匹配一个或多个数字
  //  | 是正则表达式中的逻辑“或”操作符，表示选择两个模式之一
  //  [()+\-*/] 表示匹配方括号内的任何一个字符，包括括号和四则运算符
  for (let i = 0; i < tokens.length; i++) {
    yield tokens[i];
  }
}
/**

  String.prototype.match()知识点：
    1. 基本语法: string.match(regex) ----- 其中string是要进行匹配的字符串，regex是一个正则表达式对象
    2. 返回值 : 返回一个数组，其中包含所有与正则表达式匹配的子字符串。如果没有匹配到任何内容，则返回null
    3. 例子：展示了如何使用match()方法获取字符串中的数字部分：
        const string = "abc 123 def 456 ghi";
        const regex = /\d+/g;
        const matches = string.match(regex);  ----> then matches is ["123", "456"]
 */

/* ------------------------ Solution 2: for loop ------------------------------- */
/**
 * @param {string} str
 * @return {Generator}
 */
function* tokenizer(str) {
  let buffer = '';

  for (let i = 0; i < str.length; i++) {
    const char = str[i];

    switch (char) {
      case ' ':
        continue;
      case '+':
      case '-':
      case '*':
      case '/':
      case '(':
      case ')':
        if (buffer != '') {
          yield buffer;
          buffer = '';
        }

        yield char;
        continue;
      default:
        buffer += char;
    }
  }

  if (buffer != '') yield buffer;
}
