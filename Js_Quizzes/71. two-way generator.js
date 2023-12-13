// This is a JavaScript Quiz from BFE.dev

function* gen() {
  yield 2 * (yield 100);
}

const generator = gen();
console.log(generator.next().value); // inner yield rersolves first: 100
console.log(generator.next(1).value); // repalce yield 100 with 1 and execute yield 2*1: 2
console.log(generator.next(1).value); // gen status is done at this point: undefined

/**
  With a generator function, values are not evaluated until they are needed. 
  Therefore a generator allows us to define a potentially infinite data structure.

  The next() method returns an object with two properties done and value. 
  You can also provide a parameter to the next method to send a value to the generator. 
  The value will be assigned as a result of a yield expression.

  Because Grouping Operator gets evaluated first, the generator function gen yields/returns 100
  Since we have passed 1 to the next() method. yield 100 is basically replaced with 1 and it returns 2*1 = 2
  Since generator is completed it returns undefined
 */
