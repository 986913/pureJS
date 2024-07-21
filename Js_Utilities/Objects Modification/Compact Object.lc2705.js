/**
 * @param {Object|Array} obj
 * @return {Object|Array}
 */

var compactObject = function (obj) {
  if (typeof obj !== 'object') return obj;

  const result = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    if (Boolean(obj[key]) === true) {
      if (Array.isArray(obj)) {
        result.push(compactObject(obj[key])); // 处理数组时，用push添加元素到结果数组
      } else {
        result[key] = compactObject(obj[key]); // 处理对象时，用键值对方式添加属性到结果对象
      }
    }
  }
  return result;
};
