// This is a JavaScript Quiz from BFE.dev

var obj = {
  a: 'BFE',
  b: 'dev',
  func:
    (function foo() {
      return this.a;
    },
    function bar() {
      return this.b;
    }),
};

console.log(obj.func()); // "dev"

/**
  The comma operator (,) evaluates each of its operands (from left to right) and returns the value of the last operand.

  This means, func is actually assigned the function bar as it is the last operand; 
  and when invoked it prints this.b i.e. "dev"
 */
