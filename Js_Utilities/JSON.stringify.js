/**
  Implement your own JSON.stringify() function that converts a JavaScript value into a JSON string. 
  You may ignore the second and the third optional parameters in the original API.
  The function should behave exactly like JSON.stringify() for any data types
*/

/* -------------------用例测试--------------------*/
jsonStringify(); // undefined
jsonStringify(undefined); // undefined
jsonStringify(null); // 'null'
jsonStringify(true); // 'true'
jsonStringify(false); // 'false'
jsonStringify(1); // '1'
jsonStringify('foo'); // '"foo"'
jsonStringify('"foo"') === '"\\"foo\\""'; // Double quotes present in the original input are escaped using backslashes
jsonStringify(Symbol('foo')); // undefined
jsonStringify(() => {}); // undefined
jsonStringify({ foo: 'bar' }); // '{"foo":"bar"}'
jsonStringify(['foo', 'bar']); // '["foo","bar"]'
jsonStringify(/foo/); // '{}'
jsonStringify(new Map()); // '{}'
jsonStringify(new Set()); //'{}'

/* ------------------ Solution Code ---------------------------------------------------- */
const isCyclic = (input) => {
  const seen = new Set();

  const dfsHelper = (obj) => {
    if (typeof obj !== 'object' || obj === null) {
      return false;
    }

    seen.add(obj);
    return Object.values(obj).some(
      (value) => seen.has(value) || dfsHelper(value)
    );
  };

  return dfsHelper(input);
};

/**
 * @param {*} value
 * @return {string}
 */

function jsonStringify(data) {
  const quotes = '"';
  const QUOTE_ESCAPE = /"/g;

  if (isCyclic(data)) {
    throw new TypeError('Converting circular structure to JSON');
  }

  if (typeof data === 'bigint') {
    throw new TypeError('Do not know how to serialize a BigInt');
  }

  if (data === null) {
    // Handle null first because the type of null is 'object'.
    return 'null';
  }

  const type = typeof data;

  if (type === 'number') {
    // For NaN and Infinity we return 'null'.
    if (Number.isNaN(data) || !Number.isFinite(data)) {
      return 'null';
    }
    return String(data);
  }

  if (type === 'boolean') {
    return String(data);
  }

  if (type === 'function' || type === 'undefined' || type === 'symbol') {
    return undefined; // Not the string 'undefined'.
  }

  if (type === 'string') {
    return quotes + data.replace(QUOTE_ESCAPE, '\\"') + quotes;
  }

  // At this point `data` is either an array, a plain object, or other unsupported object types such as `Map` and `Set`.
  if (typeof data.toJSON === 'function') {
    // If data has user-provided `toJSON` method, we use that instead.
    return jsonStringify(data.toJSON());
  }

  if (data instanceof Array) {
    // Array.prototype.toString will be invoked implicitly during string concatenation.
    return '[' + data.map((item) => jsonStringify(item)) + ']';
  }

  // `data` is a plain object.
  const entries = Object.entries(data)
    .map(([key, value]) => {
      const shouldIgnoreEntry =
        typeof key === 'symbol' ||
        value === undefined ||
        typeof value === 'function' ||
        typeof value === 'symbol';

      if (shouldIgnoreEntry) return;

      return quotes + key + quotes + ':' + jsonStringify(value);
    })
    .filter((value) => value !== undefined);

  // Again, Object.prototype.toString will be invoked implicitly during string concatenation
  return '{' + entries + '}';
}
