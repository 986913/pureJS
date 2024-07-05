/* -------------------用例测试1--------------------*/
objDiff({}, { a: 1, b: 2 }); // {}
objDiff(
  { a: 1, v: 3, x: [], z: { a: null } },
  { a: 2, v: 4, x: [], z: { a: 2 } }
); // {"a":[1,2],"v":[3,4],"z":{"a":[null,2]}}s
objDiff(
  { a: 5, v: 6, z: [1, 2, 4, [2, 5, 7]] },
  { a: 5, v: 7, z: [1, 2, 3, [1]] }
); // {"v":[6,7],"z":{"2":[4,3],"3":{"0":[2,1]}}}
objDiff({ a: { b: 1 } }, { a: [5] }); // {"a":[{"b":1},[5]]}
objDiff({ a: [1, 2, {}], b: false }, { b: false, a: [1, 2, {}] }); // {}
objDiff([2], [4]); // {"0":[2,4]}
/* -----------------------------------------------*/

/**
 * @param {Object|Array} obj1
 * @param {Object|Array} obj2
 * @return {Object|Array}
 */
function objDiff(obj1, obj2) {
  // 如果两者相等，返回空对象, 这意味着后续的代码只处理 obj1 和 obj2 不相等的情况。
  if (obj1 === obj2) return {};

  // 如果其中一个是null而另一个不是，返回它们的差异
  if (obj1 === null && obj2) return [obj1, obj2];
  if (obj2 === null && obj1) return [obj1, obj2];

  // 如果两者都是原始类型，返回它们的差异
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object') return [obj1, obj2];

  // 如果一个是数组而另一个不是，返回它们的差异
  if (Array.isArray(obj1) !== Array.isArray(obj2)) return [obj1, obj2];

  // when obj1,obj2 both are object OR both are array:
  const result = {};
  // 遍历 obj1 中的所有键
  for (const key in obj1) {
    // 如果 obj2 中也包含该键
    if (key in obj2) {
      // 递归调用 objDiff 比较子属性的差异
      const subDiff = objDiff(obj1[key], obj2[key]);
      // 如果子属性存在差异，将其添加到结果对象中
      if (Object.keys(subDiff).length > 0) {
        result[key] = subDiff;
      }
    }
  }
  return result;
}
