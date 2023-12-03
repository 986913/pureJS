// This is a JavaScript Quiz from BFE.dev

function foo() {
  console.log(i);
  for (var i = 0; i < 3; i++) {
    console.log(i);
  }
}

foo();
/**
  undefined,
  0,
  1,
  2
 */

/**
  Since we are using var to declare i,
  because of hoisting the declaration is moved to the top but not initialized hence its undefined. 
  The for loop works as usual
 */
