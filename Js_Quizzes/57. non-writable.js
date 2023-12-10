const a = {};
Object.defineProperty(a, 'foo1', {
  value: 1,
});

const b = Object.create(a);
b.foo2 = 1;

console.log(b.foo1); // 1
console.log(b.foo2); // 1

b.foo1 = 2;
b.foo2 = 2;

console.log(b.foo1); // 1
console.log(b.foo2); // 2

/**
  Object.defineProperty() defines a new property directly on an object, or modifies an existing property on an object, and returns the object.
  This takes in 3 parameters; the target object, nameof the property and descriptor. 
  The writable descriptor describes if the value associated with the property can be changed with an assignment operator. Defaults to false

  Here, when defining foo1, since the writable property is not defined explicitly it'll default to false. 
  Meaning, that the value cannot be changed later on hence b.foo1 is locked at 1 and is immutable.

  Object.create() method creates a new object, using an existing object as the prototype of the newly created object. 
  Here, we have created a new object b using a as prototype
 */
