const obj = {
  a: 1,
  b: this.a + 1, // this is actually window
  c: () => this.a + 1, // arrow functions points to enclosing this i.e. window
  d() {
    return this.a + 1; // this refers to obj
  },
  e() {
    return (() => this.a + 1)(); // Arrow function here borrows this from outside function i.e. obj
  },
};

console.log(obj.b); // undefined + 1 = NaN
console.log(obj.c()); // undefined + 1 = NaN
console.log(obj.d()); // 1 + 1 = 2
console.log(obj.e()); // 1 + 1 = 2

/**
  In Javascript, only function calls establish a new this context.
  An object literal constructor is not a method call, so it does not affect this in any way; 
  it will still refer to whatever it was referring to outside of the object literal.
 */
