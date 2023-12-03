console.log(0 == '0'); // true (after type conversion '0' = 0)
console.log(0 === '0'); // false
console.log(Object.is(0, '0')); // false

console.log(0 == 0); // true
console.log(0 === 0); // true
console.log(Object.is(0, 0)); // true

console.log(0 == -0); // true
console.log(0 === -0); // true
console.log(Object.is(0, -0)); // false

console.log(NaN == NaN); // false
console.log(NaN === NaN); // false
console.log(Object.is(NaN, NaN)); // true

console.log(0 == false); // true (after type conversion false = 0)
console.log(0 === false); // false
console.log(Object.is(0, false)); // false

/**
  The equality operator (==) checks whether its two operands are equal, 
  it attempts to convert and compare operands that are of different types

  The strict equality operator (===) checks whether its two operands are equal without any implicit conversion

  The Object.is() method determines whether two values are the same value. 
  Note that this is not the same as being equal according to the == or === operator
 */
