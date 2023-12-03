// This is a JavaScript Quiz from BFE.dev

const arr = [1, 2];
arr.push(3, 4);
arr.unshift(5, 6);
console.log(arr); //[5,6,1,2,3,4]

/**
  The important thing to note is that, 
  if multiple elements are passed as parameters, they're inserted as a chunk at the beginning, 
  in the exact same order they were passed as parameters. This is different than adding it one by one.
 */
