/* 
  Implement a function camelCaseKeys, 
  that takes an object and returns a new object with all its keys converted to camel case.
*/

/* --------------------- 用例测试: 实现这种函数 ----------------------- */
camelCaseKeys({ foo_bar: true }); // { fooBar: true }
camelCaseKeys({ foo_bar: true, bar_baz: { baz_qux: '1' } }); // { fooBar: true, barBaz: { bazQux: '1' } }
camelCaseKeys([{ baz_qux: true }, { foo: true, bar: [{ foo_bar: 'hello' }] }]);
// [{ bazQux: true }, { foo: true, bar: [{ fooBar: 'hello' }] }]

/* -------------------------------- Code solution: 🟡 DeepClone变形题 ---------------------------------- */
/**
 * @param {string} str
 * @return {string}
 */
function camelCase(str) {
  if (!/[_]/.test(str)) return str; // 如果输入字符串中不含有下划线，则返回原字符串

  // 如果字符串中含有下划线，先将字符串全部转换成小写字母，然后将下划线后面的第一个字母转换成大写字母
  return str
    .toLowerCase()
    .replace(/([_])([a-z])/g, (_match, _p1, p2) => p2.toUpperCase()); // 使用正则表达式将下划线后面的第一个字母转换成大写字母
}

/**
 * @param {Object} value
 * @return {Object}
 */
function camelCaseKeys(value) {
  // when value is primitive OR value is null:
  if (typeof value !== 'object' || value === null) return value;

  // when value is array:
  if (Array.isArray(value)) {
    return value.map((item) => camelCaseKeys(item));
  }

  // when value is object:
  const entries = Object.entries(value);
  const keyConverted_Cloned_Entries = entries.map(([key, value]) => [
    camelCase(key),
    camelCaseKeys(value),
  ]);
  return Object.fromEntries(keyConverted_Cloned_Entries);
}
