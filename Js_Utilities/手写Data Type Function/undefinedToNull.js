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
undefinedToNull({ a: 'BFE.dev', b: 'BFE.dev' }); //{a: 'BFE.dev', b: 'BFE.dev'}

/* -------------------------- Code Solution: Recursion -------------------------------- */
/**
 * @param {any} arg
 * @returns any
 */
function undefinedToNull(arg) {
  if (Array.isArray(arg)) return arg.map(undefinedToNull); //如果传入的arg是一个数组，那么函数将对数组中的每个元素调用undefinedToNull函数，并返回一个新的数组，其中所有undefined值被转换为null。

  if (typeof arg !== 'object') return arg === undefined ? null : arg; // 如果arg是基本类型或者null，函数将检查是否为undefined，若是则返回null，否则返回原始值。

  // when arg is object: 函数将迭代对象的所有属性，并使用递归调用undefinedToNull函数来处理每个属性值。这样，无论对象的嵌套层级多深，都会确保将所有嵌套的undefined替换为null。
  for (let key in arg) {
    arg[key] = undefinedToNull(arg[key]);
  }

  return arg;
}
