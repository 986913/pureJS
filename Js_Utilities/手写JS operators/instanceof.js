/*
  手写instanceOf:
  The instanceof operator tests to see if the prototype property of a constructor appears anywhere in the prototype chain of an object. 
*/

/*-------------------- 用例测试 -------------------------*/
class A {}
class B extends A {}

const b = new B();
myInstanceOf(b, B); // true
myInstanceOf(b, A); // true
myInstanceOf(b, Object); // true

function C() {}
myInstanceOf(b, C); // false
C.prototype = B.prototype;
myInstanceOf(b, C); // true
C.prototype = {};
myInstanceOf(b, C); // false

/* -------------------------- Code Solution -------------------------------- */
/**
 * @param {any} obj
 * @param {target} target
 * @return {boolean}
 */
function myInstanceOf(obj, target) {
  /*
    Primitive type的wrapper,如Number，String，Boolean etc are NOT inherancte from Object
      true instanceof Object  --> false
      3 instanceof Object     --> false
      'hi' instanceof Object  --> false
   */
  if (obj === null || typeof obj !== 'object') return false;

  while (obj !== null) {
    if (obj.__proto__ === target.prototype) return true;
    obj = obj.__proto__; // 顺着原型链上找
  }

  return false; // 原型链上没找到
}
