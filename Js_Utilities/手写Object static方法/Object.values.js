/**
  In this coding challenge, you will be implementing a function called getValues(object) that takes an argument: an object. 
  The function should return an array will all of the object’s values.
 */

/* --------------------- 用例测试 ----------------------- */
const object = { foo: 1, bar: 2, baz: 3 };
getValues(object); // Output: [1, 2, 3]

const object2 = { foo: 1, bar: 2 };
getValues(object2); // Output: [1, 2]

const object3 = {};
getValues(object3); // Output: []

/* ----------------------------- Solution -------------------------------- */
export const getValues = (object) => {
  let res = [];
  for (let key in object) {
    res.push(object[key]);
  }
  return res;
};
