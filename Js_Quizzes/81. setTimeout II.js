// This is a JavaScript Quiz from BFE.dev

let num;

for (let i = 0; i < 5; i++) {
  num = i;
  setTimeout(() => {
    console.log(num);
  }, 100);
}

/*
  4
  4
  4
  4
  4
 */

/* 
  In the for loop, only i is block scoped. It is within for loop.
  num variable is outside for loop. It's scope is NOT specific to each block of for loop

  num behaves like var The variable num is actually declared within the for loop 
  and the setTimeout's inner function accesses it. So when the for loop is done running, 
  each of the inner functions refers to the same variable num, which at the end of the loop is equal to 4
*/
