// This is a JavaScript Quiz from BFE.dev

if (
  function foo() {
    console.log('BFE');
  }
) {
  console.log('dev');
}
foo();

/**
  "dev"
  Error
 */

/**
  Here, because we are using a function inside an if it's supposed to be evaluated as a boolean. Boolean(any function) is always true. So, if block gets through and "dev" gets printed.

  In simple terms, foo gets evaluated and it exists for that evaluation step only. 
  Unlike other normal function declarations foo will not get hoisted and will not be available to execute anywhere (not even inside that if block)

  Trying to run foo after will give ReferenceError: foo is not defined
 */
