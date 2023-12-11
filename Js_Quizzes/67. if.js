// This is a JavaScript Quiz from BFE.dev

if (true) {
  function foo() {
    console.log('BFE');
  }
}
if (false) {
  function bar() {
    console.log('dev');
  }
}

foo(); // 'BFE'
bar(); // Error

/**
  Function declarations are not block scoped. This means a function declared in a block will leak outside it. If and when Javascript actually executes the block and creates the function for you.
  In the first if, JS will actually create the function foo that is available outside the block too. When we are declaring the function inside the if block, with a false condition, JS won’t execute the if block hence won’t create the function bar.
  So, you get an error while calling the function bar.

  However, this behavior may be inconsistent
 */
