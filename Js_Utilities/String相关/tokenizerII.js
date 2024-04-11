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
// precedenece数字越大 代表优先级越高
const signs = {
  '(': { precedence: 0 },
  ')': { precedence: 0 },
  '+': { method: (a, b) => a + b, precedence: 1 },
  '-': { method: (a, b) => a - b, precedence: 1 },
  '*': { method: (a, b) => a * b, precedence: 2 },
  '/': { method: (a, b) => a / b, precedence: 2 },
};
// helper function:
function* tokenizer(str) {
  let s = str.replaceAll(' ', '');
  const tokens = s.match(/(\d+|[()+\-*/])/g);
  for (let i = 0; i < tokens.length; i++) {
    yield tokens[i];
  }
}
// helper function:
function simpleCalc(operatorStack, valueStack) {
  const operation = operatorStack.pop();
  const val_1 = valueStack.pop();
  const val_2 = valueStack.pop();
  const result = signs[operation].method(val_2, val_1);
  valueStack.push(result);
}

/**
 * @param {string} str
 * @returns {Number}
 */
function calculate(str) {
  const tokenized = tokenizer(str);

  // 用2个stack：
  const value_stack = [];
  const operator_stack = [];

  /********************** step 1 **************************/
  for (let cur of tokenized) {
    if (!isNaN(parseInt(cur))) {
      // if the token is number
      value_stack.push(parseInt(cur));
    } else if (cur === '(') {
      // if the token is (
      operator_stack.push(cur);
    } else if (cur === ')') {
      // if the token is ),  Keep popping operator_stack until we see "("
      while (operator_stack[operator_stack.length - 1] !== '(') {
        simpleCalc(operator_stack, value_stack);
      }
      operator_stack.pop();
    } else if (signs[cur] !== -1) {
      // if the token is one of operators: + - * /
      while (
        operator_stack.length > 0 &&
        signs[operator_stack[operator_stack.length - 1]].precedence >=
          signs[cur].precedence
      ) {
        simpleCalc(operator_stack, value_stack);
      }
      operator_stack.push(cur);
    }
  }

  /********************** step 2 **************************/
  while (operator_stack.length) {
    simpleCalc(operator_stack, value_stack);
  }

  /********************** step 3 **************************/
  // console.log(operator_stack, value_stack); // operator_stack should empty. value_stack should only have one value
  return value_stack.pop();
}

/**
  以 calculate(" 2*(20-300x2 "))为例， tokenizer之后的tokens为 ['2', '*', '(', '20', '-', '300', 'x', '2', ')'] 
  使用两个栈 value_stack 和 operator_stack 进行计算。分为三大类处理：数字，（），加减乘除符号：
    遍历标记序列：
      将数字 2 推入 value_stack：     value_stack = [2]
      将乘号 * 推入 operator_stack：  operator_stack = ['*']
      将左括号 ( 推入 operator_stack：operator_stack = ['*', '(']
      将数字 20 推入 value_stack：    value_stack = [2, 20]
      将减号 - 推入 operator_stack：  operator_stack = ['*', '(', '-']
      将数字 300 推入 value_stack：   value_stack = [2, 20, 300]
      将字母 x 推入 operator_stack：  operator_stack = ['*', '(', '-', 'x']
      将数字 2 推入 value_stack：     value_stack = [2, 20, 300, 2]
      将右括号 ) 遇到时，从 operator_stack 中依次弹出运算符，直到遇到左括号 (。 对每个弹出的运算符，从 value_stack 中弹出两个数字进行运算，并将结果推回 value_stack。
        弹出 x，弹出 2，弹出 300，计算 300 乘以 2 的结果 600，并将 600 推入 value_stack：value_stack = [2, 20, 600]
        弹出 -，弹出 20，弹出 600，计算 20 减去 600 的结果 -580，并将 -580 推入 value_stack：value_stack = [2, -580]
      弹出左括号 (：                  operator_stack = ['*']
    
    标记序列遍历完毕后，将 operator_stack 中剩余的运算符依次弹出，并对每个运算符进行相应的运算，将结果推回 value_stack。
      弹出 *，弹出 -580，弹出 2，计算 -580 乘以 2 的结果 -1160，并将 -1160 推入 value_stack：value_stack = [-1160]
    最终，value_stack 中的唯一元素
 */
