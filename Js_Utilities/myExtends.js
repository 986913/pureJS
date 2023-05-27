/**
  I believe you've used [extends](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/extends) keyword in you JavaScript programs before.

  Could you implement a `myExtends()` function in ES5 to mimic the behavior of `extends`?
  `myExtends()` takes a SubType and SuperType, and return a new type.
    const InheritedSubType = myExtends(SuperType, SubType)
    const instance = new InheritedSubType()
    // above should work (almost) the same as follows
    class SubType extends SuperType {}
    const instance = new SubType()


  To solve this problem, you need to fully understand what is [Inheritance](https://javascript.info/class-inheritance)
  note: Your code will be test against following SuperType and SubType
    function SuperType(name) {
        this.name = name
        this.forSuper = [1, 2]
        this.from = 'super'
    }
    SuperType.prototype.superMethod = function() {}
    SuperType.prototype.method = function() {}
    SuperType.staticSuper = 'staticSuper'
    function SubType(name) {
        this.name = name
        this.forSub = [3, 4]
        this.from = 'sub'
    }
    SubType.prototype.subMethod = function() {}
    SubType.prototype.method = function() {}
    SubType.staticSub = 'staticSub'
 */
/* --------------------- 用例测试 ----------------------- */
const ExtendedType = myExtends(SuperType, SubType);
const instance = new ExtendedType('bfe');
expect(instance.name).toBe('bfe');
expect(instance.from).toBe('sub');
expect(instance.forSub).toBe(forSub);
expect(instance.forSuper).toBe(forSuper);
expect(instance.__proto__).toBe(SubType.prototype);
expect(instance.__proto__.__proto__).toBe(SuperType.prototype);
expect(ExtendedType.staticSuper).toBe('staticSuper');
expect(ExtendedType.__proto__).toBe(SuperType);

/*--------------------------Solution ------------------------- */
const myExtends = (SuperType, SubType) => {
  // instance object properties and methods 的继承 in ES5 --> 子constructor's prototype point to 父constructor's instance object
  SubType.prototype = new SuperType();

  // static method 的继承 in ES5 --> Object.setPrototypeOf(子constructor, 父constructor);
  Object.setPrototypeOf(SubType, SuperType);

  return SubType;
};
