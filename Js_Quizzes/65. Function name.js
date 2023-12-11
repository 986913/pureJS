var foo = function bar() {
  return 'BFE';
};

console.log(foo()); // "BFE"
console.log(bar()); // Error

/*  
  In `named function expression`, identifier ( in this case `bar`) is only available in the function body. 

  `bar` is never declared outside of the function body. Even if we do `console.log(bar)` outside of the function, 
  it will throw `ReferenceError`
*/
