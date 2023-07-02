/**
  In tokenizer I, you are able to extract the tokens from a string with invalid spaces.
  This is a follow up on [tokenizer I]

  Now please `calculate()` the result of the string. You can use the tokenizer you wrote before.
    1. the input expression is syntactically valid, containing non-negative integers, `+`, ``, ``, `/`, `(`, `)` and spaces
    2. Don't use `eval()`
 */

/* --------------------- 用例测试 ----------------------- */
calculate('1 * (20 -   300      ) '); // -280
calculate('     1/0 '); // Infinity
calculate(' (100 * 1 ) / ( 49 + 1) '); //2
calculate('   (2 * (3 + 4 * (5 + 6))) / 2        '); //47
calculate('1 + 2'); //3
calculate('1 - 2'); // -1
calculate('1 * 2'); // 2
calculate('1 / 2'); // 0.5
calculate(' (3 * 1 / 3 - 0) / (1 - 1 + 1 - 1) '); // Infinity
calculate(' (2 - 3) / ( 3/3*3/3 - 1   )'); // -Infinity
calculate('1/0 + (99 - 1000)/(3-3)'); // NaN
calculate(' (3 *      3 - 8 - 1) / (2 *(1 + 1)  - 4) '); // NaN

/* ------------------------- Soltion -------------------------------- */
// helper function:
function* tokenizer(str) {
  let s = str.replaceAll(' ', '');
  const tokens = s.match(/(\d+|[()+\-*/])/g);
  for (let i = 0; i < tokens.length; i++) {
    yield tokens[i];
  }
}

const operations = {
  '+': { method: (a, b) => a + b, precedence: 1 },
  '-': { method: (a, b) => a - b, precedence: 1 },
  '*': { method: (a, b) => a * b, precedence: 2 },
  '/': { method: (a, b) => a / b, precedence: 2 },
  '(': { precedence: 0 },
  ')': { precedence: 0 },
};
/**
 * @param {string} str
 * @returns {Number}
 */
function calculate(str) {
  // your code here
  const tokenized = tokenizer(str);
  const value_stack = [];
  const operator_stack = [];

  for (let elem of tokenized) {
    if (!isNaN(parseInt(elem))) {
      value_stack.push(parseInt(elem));
    } else if (elem === '(') {
      operator_stack.push(elem);
    } else if (elem === ')') {
      // Keep popping until we see "("
      while (operator_stack[operator_stack.length - 1] !== '(') {
        const operation = operator_stack.pop();
        const val_1 = value_stack.pop();
        const val_2 = value_stack.pop();
        const result = operations[operation].method(val_2, val_1);
        value_stack.push(result);
      }
      operator_stack.pop();
    } else if (operations[elem] !== -1) {
      // It is an operator
      console.log(operator_stack);
      while (
        operator_stack.length > 0 &&
        operations[operator_stack[operator_stack.length - 1]].precedence >=
          operations[elem].precedence
      ) {
        const operation = operator_stack.pop();
        const val_1 = value_stack.pop();
        const val_2 = value_stack.pop();
        const result = operations[operation].method(val_2, val_1);
        value_stack.push(result);
      }
      operator_stack.push(elem);
    }
  }

  while (operator_stack.length) {
    const operation = operator_stack.pop();
    const val_1 = value_stack.pop();
    const val_2 = value_stack.pop();
    const result = operations[operation].method(val_2, val_1);
    value_stack.push(result);
  }
  return value_stack.pop();
}

/*
Pseudocode source: https://www.geeksforgeeks.org/expression-evaluation/

1. While there are still tokens to be read in,
   1.1 Get the next token.
   1.2 If the token is:
       1.2.1 A number: push it onto the value stack.
       1.2.2 A variable: get its value, and push onto the value stack.
       1.2.3 A left parenthesis: push it onto the operator stack.
       1.2.4 A right parenthesis:
         1 While the thing on top of the operator stack is not a 
           left parenthesis,
             1 Pop the operator from the operator stack.
             2 Pop the value stack twice, getting two operands.
             3 Apply the operator to the operands, in the correct order.
             4 Push the result onto the value stack.
         2 Pop the left parenthesis from the operator stack, and discard it.
       1.2.5 An operator (call it thisOp):
         1 While the operator stack is not empty, and the top thing on the
           operator stack has the same or greater precedence as thisOp,
           1 Pop the operator from the operator stack.
           2 Pop the value stack twice, getting two operands.
           3 Apply the operator to the operands, in the correct order.
           4 Push the result onto the value stack.
         2 Push thisOp onto the operator stack.
2. While the operator stack is not empty,
    1 Pop the operator from the operator stack.
    2 Pop the value stack twice, getting two operands.
    3 Apply the operator to the operands, in the correct order.
    4 Push the result onto the value stack.
3. At this point the operator stack should be empty, and the value
   stack should have only one value in it, which is the final result.

*/
