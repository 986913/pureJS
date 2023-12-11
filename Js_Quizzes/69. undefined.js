// This is a JavaScript Quiz from BFE.dev

function foo(a, b, undefined, undefined) {
  console.log('BFE.dev');
}
console.log(foo.length); // 4

/**
  length is a property of a function object, and indicates how many arguments the function expects, 
  i.e. the number of formal parameters. In this case, foo has 4 parameters hence it logs 4

  Note that we are just logging the foo.length and not invoking foo
 */
