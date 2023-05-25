// This is a JavaScript Quiz from BFE.dev
// What does the code snippet to the right output by console.log?

const obj = {
  dev: 'bfe',
  a: function () {
    return this.dev;
  },
  b() {
    return this.dev;
  },
  /* 需要注意这个 --->  `this` of arrow function is defined by nearest function or global object. 
    so no nearest function, this refer to window  */
  c: () => {
    return this.dev;
  },
  /* 需要注意这个 --->  
    `this` of arrow function is defined by nearest function or global object. 
    Here arrow function is enclosed in a normal function which has `this===obj` 
    thus for arrow functin also `this===obj`. Hence it will return 'bfe'
   */
  d: function () {
    return (() => {
      return this.dev;
    })();
  },
  /**
    b or e don't have arrow functions, so they can still access dev in the context of this
   */
  e: function () {
    return this.b();
  },
  f: function () {
    return this.b;
  },
  /*
    we already know c is trapped in an arrow function context, so it's always gonna be undefined
   */
  g: function () {
    return this.c();
  },
  /*
    we already know c is trapped in an arrow function context, so it's always gonna be undefined
   */
  h: function () {
    return this.c;
  },
  /**
    `this` of arrow function is defined by nearest function or global object.
    the neares function is nornal function which this===obj,  
    thus for arrow functin also `this===obj`. Hence it will return 'bfe'
   */
  i: function () {
    return () => {
      return this.dev;
    };
  },
};

console.log(obj.a()); // 'bfe'
console.log(obj.b()); // 'bfe'
console.log(obj.c()); //  undefined   <---- 需要注意这个，this === window
console.log(obj.d()); //  "bfe"   <---- 需要注意这个
console.log(obj.e()); //  'bfe'
console.log(obj.f()()); // undefined
console.log(obj.g()); //  undefined
console.log(obj.h()()); // undefined
console.log(obj.i()()); // 'bfe'

/**
  知识点：
    1. Normal Function — the value of this is determined by how a function is called i.e. runtime binding.
    2. Arrow Function — don't provide their own this binding; 
                        it retains the this value of the enclosing lexical context i.e. static binding.
 */
/**
  Both a and b are normal functions, When a function is called as a method of an object, it's this is set to the object the method is called on (i.e. obj object)
  c is an arrow function hence it will basically borrow the scope from outside obj which is window
  d is a normal function so this points to obj inside it. The arrow function inside is in an IIFE and it takes this from enclosing context i.e. d hence referring to obj
  e invokes the b function internally and basically chains the value of this inside
  f though similar to e is a different case as it just returns a reference of b. We then execute this independently hence losing the reference to obj
  g and h internally use c which is an arrow function hence it always points to the window object
  i is similar to d only that it returns a reference to the inner arrow function rather than calling it immediatel
 */
