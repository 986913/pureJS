/**
 * @param {Object|Array} obj
 * @return {Object|Array} immutable obj
 */

/****************************** Solution 1: DFS + Proxy ************************************/
var makeImmutable = function (obj) {
  return dfs(obj);
};
// helper function:
const dfs = (obj) => {
  const methods = new Set([
    'pop',
    'push',
    'shift',
    'unshift',
    'splice',
    'sort',
    'reverse',
  ]);
  if (obj === null) return null;

  // when obj is function
  if (typeof obj === 'function') {
    return new Proxy(obj, {
      apply(target, thisArg, args) {
        //注意：通过target.name获取函数的名字！
        if (methods.has(target.name)) {
          // Block the execution of certain methods
          throw `Error Calling Method: ${target.name}`;
        }
        return target.apply(thisArg, args);
      },
    });
  }

  // when obj is array
  if (Array.isArray(obj)) {
    return new Proxy(obj, {
      set(_, prop, value) {
        // Block the modification of the array
        throw `Error Modifying Index: ${prop}`;
      },
      get(target, prop) {
        return dfs(target[prop]); // <---- recursion here
      },
      apply(target, thisArg, arg) {
        // Block the execution of certain methods
        if (methods.has(target.name)) {
          throw `Error Calling Method: ${func.name}`;
        }
        return target.apply(thisArg, arg);
      },
    });
  }

  // when obj is primitive value
  if (typeof obj !== 'object') return obj;

  // when obj is Object
  return new Proxy(obj, {
    set(_, prop, value) {
      // Block the modification of the object
      throw `Error Modifying: ${prop}`;
    },
    get(target, prop) {
      return dfs(target[prop]); // <---- recursion here
    },
  });
};
/**
 * const obj = makeImmutable({x: 5});
 * obj.x = 6; // throws "Error Modifying x"
 */

/****************************** Solution2: Proxy, Sol1的简洁版 ************************************/
const forbiddenMethods = new Set([
  'pop',
  'push',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse',
]);
var makeImmutable = function (obj) {
  return new Proxy(obj, {
    set(target, prop) {
      if (Array.isArray(target)) throw `Error Modifying Index: ${prop}`;
      throw `Error Modifying: ${prop}`;
    },
    get(target, prop) {
      if (typeof target[prop] === 'object' && target[prop] !== null) {
        return makeImmutable(target[prop]); // <--- recursion here:
      }

      if (typeof target[prop] === 'function') {
        return new Proxy(target[prop], {
          apply(fn, thisArg, args) {
            if (forbiddenMethods.has(prop)) {
              throw `Error Calling Method: ${prop}`;
            }
            return Reflect.apply(fn, thisArg, args);
          },
        });
      }

      return target[prop];
    },
  });
};

/********************** Solution3: Proxy, Sol1的简洁版(LC官网答案) ****************************/
var makeImmutable = function (obj) {
  // Define a set of methods that mutate the object or array.
  const methods = new Set([
    'pop',
    'push',
    'shift',
    'unshift',
    'splice',
    'sort',
    'reverse',
  ]);

  // Define the proxy handler object.
  const handler = {
    // 'set' trap throws an error when an attempt is made to modify a property.
    set: function (target, prop) {
      throw Array.isArray(target)
        ? `Error Modifying Index: ${prop}`
        : `Error Modifying: ${prop}`;
    },

    // 'get' trap creates a new proxy for nested objects or functions, while returning primitive values and 'prototype' property as is.
    get: function (target, prop) {
      const condition =
        // 'prototype' property is returned as is to avoid potential issues with inheritance.
        prop === 'prototype' ||
        // If property is null, return as is.
        target[prop] === null ||
        // If property is not an object or function, return as is.
        (typeof target[prop] !== 'object' &&
          typeof target[prop] !== 'function');

      // If the condition is true, return the property as is, else create a new Proxy
      // 如果访问的属性是对象,数组或函数，则返回一个新的代理对象，这会递归地为嵌套对象或数组创建代理。
      return condition ? target[prop] : new Proxy(target[prop], handler);
    },

    // 'apply' trap throws an error when a mutating method is called.
    apply: function (target, thisArg, argumentsList) {
      if (methods.has(target.name)) {
        throw `Error Calling Method: ${target.name}`;
      }
      return target.apply(thisArg, argumentsList);
    },
  };

  // Return a new Proxy with the defined handler.
  return new Proxy(obj, handler);
};
