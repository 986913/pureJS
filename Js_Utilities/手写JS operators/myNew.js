/**
  new operator is used to create new instance objects. 
  Do you know exactly what new does?
  You are asked to implement myNew(), which should return an object just as what new does but without using new.
  Pay attention to the return type of constructor.
 */
/* --------------------- 用例测试 1 ----------------------- */
function BigFrontEnd(name) {
  this.name = name;
}
BigFrontEnd.prototype.code = function () {};
BigFrontEnd.prototype.answer = function () {};
BigFrontEnd.prototype.design = function () {};
const obj = myNew(BigFrontEnd, 'dev');
obj.name; //'dev'
obj.code; //BigFrontEnd.prototype.code
obj.answer; //BigFrontEnd.prototype.answer
obj.design; //BigFrontEnd.prototype.design
Object.getPrototypeOf(obj); //BigFrontEnd.prototype

/* --------------------- 用例测试 2 ----------------------- */
function BigFrontEnd(name) {
  this.name = name;
}
BigFrontEnd.prototype.code = function () {};
BigFrontEnd.prototype.answer = function () {};
BigFrontEnd.prototype.design = function () {};
function BigFrontEndUndefined(name) {
  this.name = name;
  return undefined;
}
BigFrontEndUndefined.prototype = BigFrontEnd.prototype;
const obj = myNew(BigFrontEndUndefined, 'dev');
obj.name; //'dev'
obj.code; //BigFrontEnd.prototype.code
obj.answer; //BigFrontEnd.prototype.answer
obj.design; //BigFrontEnd.prototype.design
Object.getPrototypeOf(obj); //BigFrontEnd.prototype

/* --------------------- 用例测试 3 ----------------------- */
function BigFrontEndOther(name) {
  this.name = name;

  return {
    a: 1,
  };
}
const obj = myNew(BigFrontEndOther, 'dev');
obj; //{ a: 1 }， 注意obj没有name
obj.name; // undefined, 因为name不是构造函数返回对象的属性

/*--------------------------Solution ------------------------- */
/**
 * @param {Function} constructor
 * @param {any[]} args - argument passed to the constructor
 * `myNew(constructor, ...args)` should return the same as `new constructor(...args)`
 */
const myNew = (constructor, ...args) => {
  // 1. A new object is created, inheriting from constructor's prototype.
  var that = Object.create(constructor.prototype);

  // 2. The constructor function is called with the specified arguments, and with this bound to the newly created object.
  var obj = constructor.apply(that, args);

  /* 3. 如果constructor function 显式地返回一个对象(obj)，则返回该obj对象作为myNew函数的结果；否则，返回在步骤1中创建的新对象(that) */
  if (obj && typeof obj === 'object') {
    return obj;
  } else {
    return that;
  }
};
/**
  如果constructor function 显式地返回一个对象(obj)，则返回该obj对象作为myNew函数的结果；否则，返回在步骤1中创建的新对象(that)
    case 1: constructor function显式地返回一个对象(obj):
      function Person(name, age) {
        this.name = name;
        this.age = age;
        // 此构造函数返回一个对象
        return {
          greeting: "Hello",
          sayHello: function() {
            console.log(this.greeting + ", my name is " + this.name);
          }
        };
      }
      const john = myNew(Person, "John", 25);
      john.sayHello(); // 输出：Hello, my name is John
      console.log(john.age); // undefined，age 不是构造函数返回对象的属性

    case 2: constructor function没显示返回对象。 那么就要默认返回在步骤1中创建的新对象(that)
      function Person(name, age) {
        this.name = name;
        this.age = age;
        // 此构造函数没有返回一个对象
      }
      const john = myNew(Person, "John", 25);
      console.log(john.name); // John
      console.log(john.age); // 25
 */
