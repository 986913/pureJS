/*---------------用例测试-------------------*/
uniqueArray([
  1,
  1,
  '2',
  3,
  1,
  2,
  { name: 'ming', id: { n: 1 } },
  { name: 'ming', id: { n: 1 } },
  { name: 'ming', id: { n: 2 } },
  ,
]); // [1,'2',3, {name: 'ming', id: {n:1}, {name: 'ming', id: {n:2},]

uniqueArray([1, 1, 2]); // [1, 2]

/* ------------------------- Soltion  -------------------------------- */
/********** Main function *********/
const uniqueArray = (arr) => {
  let result = []; //holding unique item
  for (let item of arr) {
    let isUnique = true;
    for (let resultItem of result) {
      if (deepEqual(item, resultItem)) {
        isUnique = false;
        break;
      }
    }
    if (isUnique) result.push(item);
  }
  return result;
};

// Helper function:
const deepEqual = (a, b) => {
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    for (let akey in a) {
      if (!b.hasOwnProperty(akey)) return false;
      if (deepEqual(a[akey], b[akey]) === false) return false;
    }
    return true;
  }

  if (isObject(a) && isObject(b)) {
    for (let akey in a) {
      if (!b.hasOwnProperty(akey)) return false;
      if (deepEqual(a[akey], b[akey]) === false) return false;
    }
    return true;
  }

  return Object.is(a, b); // primitive type
};

// Helper function:
const isObject = (obj) => {
  if (obj === null || obj === undefined) return false;
  return typeof obj === 'object';
};
