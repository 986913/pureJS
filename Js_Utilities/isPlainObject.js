function isPlainObject(value) {
  if (value === null || value === undefined) return false;

  const prototype = Object.getPrototypeOf(value);
  return prototype === null || prototype.constructor === Object;
}

/**
  There are two types of plain objects:

    Objects without prototypes, created using Object.create(null).
    Object defined using literals (e.g. let a = {}).

  To check for the first case, Object.getPrototypeOf(value) will be exactly null. 
  To check for the second case, we can use the constructor of its prototype,
 */
