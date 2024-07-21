/**
 * @param {null|boolean|number|string|Array|Object} obj1
 * @param {null|boolean|number|string|Array|Object} obj2
 * @return {null|boolean|number|string|Array|Object}
 */
var deepMerge = function (obj1, obj2) {
  if (Array.isArray(obj1) && Array.isArray(obj2)) {
    const newArr = [...obj1];
    for (let key in obj2) {
      if (newArr[key]) {
        newArr[key] = deepMerge(obj1[key], obj2[key]);
      } else {
        newArr[key] = obj2[key];
      }
    }
    return newArr;
  }

  if (isPlainObject(obj1) && isPlainObject(obj2)) {
    const newObj = { ...obj1 };
    for (let key in obj2) {
      //下面等同于 obj1.hasOwnProperty(key)
      if (Object.prototype.hasOwnProperty.call(obj1, key)) {
        newObj[key] = deepMerge(obj1[key], obj2[key]);
      } else {
        newObj[key] = obj2[key];
      }
    }
    return newObj;
  }

  return obj2; // for the primitive case, eg: deepMerge({ foo: 2, bar: 3 }, { bar: 4 }); ---> { foo: 2, bar: 4 }
};

// helper function:
const isPlainObject = (obj) => {
  if (obj === null || obj === undefined) return false;
  return (
    Object.getPrototypeOf(obj) === null ||
    Object.getPrototypeOf(obj) === Object.prototype
  );
};

/**
 * let obj1 = {"a": 1, "c": 3}, obj2 = {"a": 2, "b": 2};
 * deepMerge(obj1, obj2); // {"a": 2, "c": 3, "b": 2}
 */
