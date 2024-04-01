/**
  For all the basic data types in JavaScript, how could you write a function to detect the type of arbitrary data?
  Besides basic types, you need to also handle also commonly used complex data type including Array, ArrayBuffer, Map, Set, Date and Function
  The goal is not to list up all the data types but to show us how to solve the problem when we need to.
  The type should be lowercase
 */
/* ---------------- 用例测试 ------------------ */
detectType(1) // 'number'
detectType(new Map()) // 'map'
detectType([]) // 'array'
detectType(null) // 'null'
// more in judging step


/* -------------------------------- Code solution 1  -------------------------------------- */
/**
 * @param {any} data
 * @return {string}
 */
function detectType(data) {
  const objectType =  Object.prototype.toString.call(data); // '[object Object]' 或者 '[object Object]' 等等..
  return objectType.slice(1, -1).split(' ')[1].toLowerCase(); // '[object Object]'.slice(1,-1) --> 'object Object'
}

/* -------------------------------- Code solution 2  -------------------------------------- */
function detectType(data) {
  if (data === null) return "null";
  return (data?.__proto__?.constructor?.name || typeof data).toLowerCase();
}