/**
  Write a function invertObject(obj), which takes an object obj as an argument and returns a new object where the keys and values of the original object are swapped.
  Directions
    The values of the input object can only be strings and numbers
    If the input object is empty, then return an empty object
    The function should not modify the original object
    The function should handle objects with any number of key-value pairs
 */

/* --------------------- 用例测试: 实现这种函数 ----------------------- */
const originalObj = {
  name: 'John',
  age: 30,
  city: 'New York',
};

const invertedObj = invertObject(originalObj);
console.log(invertedObj);

/* -------------------------------- Code solution  -------------------------------------- */
export const invertObject = (obj) => {
  let res = {};

  for (let [key, val] of Object.entries(obj)) {
    res[val] = key;
  }
  // or you can use for..in
  /*
    for (let key in obj) {
      let val = obj[key];
      res[val] = key;
    }
  */
  return res;
};
