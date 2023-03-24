export function isArray(value) {
  // return Array.isArray(value)
  return value instanceof Array;
}

export function isFunction(value) {
  return typeof value === 'function';
}

export function isObject(value) {
  if (value === null || value === undefined) return false;
  return typeof value === 'object';
}

export function isPlainObject(value) {
  if (value === null || value === undefined) return false;

  const prototype = Object.getPrototypeOf(value);
  return prototype === null || prototype.constructor === Object;
}

/**
isPlainObject:

There are two types of plain objects:

Objects without prototypes, created using Object.create(null)s.

Object defined using literals (e.g. let a = {}).
To check for the first case, Object.getPrototypeOf(value) will be exactly null. To check for the second case, we can use the constructor of its prototype,
 */
