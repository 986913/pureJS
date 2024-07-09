/**
  One of the differences between null and undefined is how they are treated differently in JSON.stringify().
    JSON.stringify({a: null})      // '{"a":null}'
    JSON.stringify({a: undefined}) // '{}'
    JSON.stringify([null])         // '[null]'
    JSON.stringify([undefined])    // '[null]'
  This difference might create troubles if there are missing alignments between client and server. It might be helpful to enforce using only one of them.

  You are asked to implement undefinedToNull() to return a copy that has all undefined replaced with null.
    undefinedToNull({a: undefined, b: 'BFE.dev'}) // {a: null, b: 'BFE.dev'}
    undefinedToNull({a: ['BFE.dev', undefined, 'bigfrontend.dev']}) // {a: ['BFE.dev', null, 'bigfrontend.dev']}
 */
/* -------------------用例测试--------------------*/
undefinedToNull({ a: undefined, b: 'BFE.dev' }); // {a: null, b: 'BFE.dev'}
undefinedToNull({
  a: undefined,
  b: {
    c: {
      d: undefined,
      e: ['BFE.dev', undefined],
    },
  },
});
/*
  {
    a: null, 
    b: { 
      c: { 
        d: null, 
        e: ['BFE.dev', null]
      }
    }
  }
 */
undefinedToNull([
  'BFE.dev',
  undefined,
  null,
  {
    a: ['BFE.dev', undefined],
  },
]); // ['BFE.dev', null, null, { a: ['BFE.dev', null] }]
undefinedToNull({ a: 'BFE.dev', b: 'BFE.dev' }); // {a: 'BFE.dev', b: 'BFE.dev'}
undefinedToNull({ a: undefined, b: ['a', undefined] }); // {"a":null,"b":["a",null]}

/* -------------------------- Code Solution: Recursion -------------------------------- */
/**
 * @param {Object|Array} obj
 * @return {Object|Array}
 */
const undefinedToNull = (obj) => {
  // base case:
  if (obj === undefined) return null;
  if (typeof obj !== 'object' || obj === null) return obj;

  let result = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = undefinedToNull(obj[key]); // <-- start recursion
    }
  }
  return result;
};
