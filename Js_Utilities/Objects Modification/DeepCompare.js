/**
  Compare two objects
  Write a JavaScript function called areObjectsEqual(object1, object2) that takes in two arrays object1 and object2 as parameters. 
  The function should compare the two objects and return a boolean indicating if they are equal or not.

  The function should consider two objects equal if they have the same properties and their values are also equal.

  Directions
    Operator === cannot be used to compare objects in JavaScript as it only checks for reference equality, not structural equality. 
    To check if two objects have the same key-value pairs, a deeper comparison must be performed.
    Assume that the values can only be strings and numbers.
 */

/* --------------------- 用例测试: 实现这种函数 ----------------------- */
const obj1 = { a: 1, b: 2, c: 3 };
const obj2 = { a: 1, b: 2, c: 3 };
const obj3 = { a: 1, b: 2, c: 4 };
console.log(areObjectsEqual(obj1, obj2)); // Output: true
console.log(areObjectsEqual(obj1, obj3)); // Output: false
console.log(areObjectsEqual({ a: 1, b: 'hello' }, { a: 1 })); // Output: false
console.log(
  areObjectsEqual(
    { a: 1, b: 'hello', c: true },
    { a: 1, b: 'hello', c: false },
  ),
); // Output: false
console.log(
  areObjectsEqual({ a: 1, b: 'hello', c: true }, { a: 1, b: 'hello', c: true }),
); // Output: true

/* ------------- Code solution Recurrsion ---------------------------------- */
export const areObjectsEqual = (obj1, obj2) => {
  // if both are array
  if (Array.isArray(obj1) && Array.isArray(obj2)) {
    if (obj1.length !== obj2.length) return false;
    for (let i = 0; i < obj1.length; i++) {
      // recursion
      if (areObjectsEqual(obj1[i], obj2[i]) === false) return false;
    }
    return true;
  } else if (isPlainObject(obj1) && isPlainObject(obj2)) {
    // if both are object
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) return false;
    for (let i = 0; i < keys1.length; i++) {
      const key = keys1[i];
      if (Object.hasOwn(obj2, key) === false) return false;
      // recursion
      if (areObjectsEqual(obj1[key], obj2[key]) === false) return false;
    }
    return true;
  }
  // if they are primitiva type, then simply return
  return obj1 === obj2;
};

//Helper function:
const isPlainObject = (obj) => {
  if (obj === undefined || obj === null) return false;
  const prototype = Object.getPrototypeOf(obj);
  return prototype === null || prototype === Object.prototype;
};
