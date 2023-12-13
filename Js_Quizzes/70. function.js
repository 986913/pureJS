// This is a JavaScript Quiz from BFE.dev

function foo() {
  console.log(1);
}

var foo = 2;

function foo() {
  console.log(3);
}

foo(); // Error

/**
  函数是第一公民 so above functions become this:
    function foo(){ console.log(1) }
    function foo(){ console.log(3) }
    foo = 2;
    foo(); // trying to invoke a number throws error
 */
