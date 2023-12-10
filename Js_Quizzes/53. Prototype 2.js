// Only constructor functions have ".prototype".
function F() {
  this.foo = 'bar';
}

// when the new object is created, it gets its internal [[Prototype]] which cannot be directly accessed
const f = new F();
console.log(f.prototype); // undefined

/*
  构造器有prototype， 实例对象没有prototype
  但是实例对象有__proto__ 且f.__proto__ === F.prototype
*/
