/* deep clone I: 
    可以对 JavaScript 中的5种主要的数据类型（包括Number、String、Object、Array、Boolean）进行DEEP clone,
    ie:  Any changes made to the deeply-copied object will not affect the original object.
*/

/* --------------------- 用例测试: 实现这种函数 ----------------------- */
const obj1 = { user: { role: 'admin' } };
const clonedObj1 = deepClone(obj1);
clonedObj1.user.role = 'guest'; // Change the cloned user's role to 'guest'.
clonedObj1.user.role; // 'guest'
obj1.user.role; // Should still be 'admin'.

const obj2 = { foo: [{ bar: 'baz' }] };
const clonedObj2 = deepClone(obj2);
obj2.foo[0].bar = 'bax'; // Modify the original object.
obj2.foo[0].bar; // 'bax'
clonedObj2.foo[0].bar; // Should still be 'baz'.

/* ------------- Code solution 1 : using for...in + recurrsion ---------------------------------- */
function deepClone(value) {
  // when value is primitive or null (递归终止时)
  if (typeof value !== 'object' || value === null) return value;

  //单层递归逻辑：
  const result = Array.isArray(value) ? [] : {};
  //注意用的for...in
  for (let key in value) {
    // 保证key不是原型上的属性
    if (value.hasOwnProperty(key)) {
      // recurrsion:
      result[key] = deepClone(value[key]);
    }
  }

  return result;
}

/* ------------- Code solution 2 : using Object.fromEntries + recurrsion ---------------------------------- */
function deepClone(value) {
  // when value is primitive or null (递归终止时)
  if (typeof value !== 'object' || value === null) return value;

  // when value is array: recurrsion
  if (Array.isArray(value)) {
    return value.map((item) => deepClone(item));
  }

  //when value is object, Converting the object into an array of a key-value tuple with Object.entries, and starting recursion
  const entries = Object.entries(value);
  const clonedEntries = entries.map(([key, value]) => [key, deepClone(value)]);
  return Object.fromEntries(clonedEntries);
}

/***
 * 知识点：
 * 1. 使用 for … in 进行遍历object时候，它也会遍历原型上的属性。所以在一些case处理上，要用.hasOwnProperty(key)判断key是不是原型上的属性.
 * 2. Object.entries( {foo:'bar', baz:42} )             --->  [ ['foo', 'bar'], ['baz', 42] ]
 * 3. Object.fromEntries ( [['foo','bar'],['baz',42]] ) --->  {foo:'bar', baz:42}
 *
 */
