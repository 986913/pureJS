function isBoolean(value) {
  return typeof value === 'boolean';
}

function isNumber(value) {
  return typeof value === 'number';
}

function isNull(value) {
  return value === null;
}

function isString(value) {
  return typeof value === 'string';
}

function isSymbol(value) {
  return typeof value === 'symbol';
}

function isUndefined(value) {
  return value === undefined;
}

/**
 * It's also important to note the difference between null and undefined.
 * null == undefined is true, so we need to use === if the intention is to checking for exact null and undefined values.
 */
