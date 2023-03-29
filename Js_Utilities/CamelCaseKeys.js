/* 
  Implement a function camelCaseKeys, 
  that takes an object and returns a new object with all its keys converted to camel case.
*/

/* --------------------- 用例测试: 实现这种函数 ----------------------- */
camelCaseKeys({ foo_bar: true }); // { fooBar: true }

camelCaseKeys({ foo_bar: true, bar_baz: { baz_qux: '1' } }); // { fooBar: true, barBaz: { bazQux: '1' } }

camelCaseKeys([{ baz_qux: true }, { foo: true, bar: [{ foo_bar: 'hello' }] }]);
// [{ bazQux: true }, { foo: true, bar: [{ fooBar: 'hello' }] }]

/* -------------------------------- Code solution ---------------------------------- */
