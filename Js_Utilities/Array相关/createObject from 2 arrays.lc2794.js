/**
 * @param {Array} keysArr
 * @param {Array} valuesArr
 * @return {Object}
 */

/*********************************Solution 1: use forloop ***********************************/
var createObject = function (keysArr, valuesArr) {
  let result = {};
  for (let i = 0; i < keysArr.length; i++) {
    let key = String(keysArr[i]);
    let val = valuesArr[i];

    // result[key] === undefined 等价于 !(key in result)
    if (result[key] === undefined) {
      result[key] = val;
    }
  }
  return result;
};

/*********************************Solution 2:  .hasOwnProperty() ***********************************/
var createObject = function (keysArr, valuesArr) {
  const obj = {};
  for (const i in keysArr) {
    if (!obj.hasOwnProperty(keysArr[i])) {
      obj[keysArr[i]] = valuesArr[i];
    }
  }
  return obj;
};
