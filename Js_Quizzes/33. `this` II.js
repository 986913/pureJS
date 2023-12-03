const obj = {
  a: 1,
  b() {
    return this.a;
  },
};

console.log(obj.b()); // 1
console.log((true ? obj.b : a)()); // undefined
console.log((true, obj.b)()); // undefined
console.log((3, obj['b'])()); // undefined
console.log(obj.b()); // 1
console.log((obj.c = obj.b)()); // undefined

/**
  1. When b is called as a method of obj, it's this is set to the object the method is called on (i.e. obj object). Hence , this.a is 1

  5. (obj.b)() is same as obj.b(). Hence, similar to first case it'll print 1

  2., 3. and 4. and 6. Here, the statement evaluates to obj.b which is only the reference to a plain function. 
  Executing this independently loses the reference to obj. Hence, this is window and this.a prints undefined
 */
