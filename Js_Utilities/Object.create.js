/**
  You can use [Object.create()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create) to create a new object.
  
  The Object.create() static method creates a new object, using an existing object as the prototype of the newly created object. 
  
  Can you write your own `myObjectCreate()` to do the same(well for the basic usage) ?
  Note:
    1. you don't need to support `propertiesObject`2nd parameter of Object.create
    2. throw an Error if non-object is passed in. ([why](https://stackoverflow.com/questions/18198178/null-prototype-object-prototype-and-object-create)?)`myObjectCreate(null)`
    3. `Object.create()` and `Object.setPrototypeOf()` should not be used.
 */

/*-------------------- 用例测试-------------------------*/
myObjectCreate(null); // should throw error
myObjectCreate(1); // should throw error
myObjectCreate(undefined); // should throw error
myObjectCreate(true); // should throw error
const proto = {};
const a = myObjectCreate(proto);
expect(Object.getPrototypeOf(a)).toBe(proto);

/* ---------------------------- Solution -------------------------------- */
/**
 * @param {any} proto
 * @return {object}
 */
function myObjectCreate(proto) {
  if (typeof proto !== 'object' || proto === null) {
    throw new Error(
      `Expected object but received ${proto === null ? 'null' : typeof proto}`
    );
  }

  const obj = {};
  obj.__proto__ = proto;
  return obj;
}
