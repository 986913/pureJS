/**
  Obviously, JSON.parse() and JSON.stringify() are unable to handle data types that are not supported in JSON.
    JSON.stringify({a:1n}) // Error
  Also `undefined` is ignored in object properties or changed to `null`.
    JSON.stringify([undefined]) // "[null]"
    JSON.stringify({a: undefined }) // "{}"
  `NaN` and `Infinity` are also treated as `null`
    JSON.stringify([NaN, Infinity]) // "[null,null]"
    JSON.stringify({a: NaN, b:Infinity}) // "{"a":null,"b":null}"
  for more info, please refer to [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#description).
  But sometimes we might want to be able to serialize these data types.

  **Now please implement functions to serialize and deserialize following data types:**
    1. primitives (symbol is exluded)
    2. object literals
    3. array
  Object literals and arrays are consisting of primitives and might be nested
  Code below is expected to work:
    parse(stringify([1n, null, undefined, NaN])) // [1n, null, undefined, NaN]
    parse(stringify({a: undefined, b: NaN}) // {a: undefined, b: NaN}

  You can use JSON.stringify() and JSON.parse() in your code or write your own.
 */

/* -------------------------- 用例测试 --------------------------------*/
for (const input of [
  undefined,
  null,
  NaN,
  100,
  1n,
  'null',
  true,
  { a: 3 },
  [3, 1n],
]) {
  expect(typeof stringify(input)).toBe('string');
}
parse(stringify(NaN)); //  NaN
parse(stringify(Infinity)); //Infinity
parse(stringify(-Infinity)); //-Infinity
parse(stringify(undefined)); // undefined
parse(stringify('undefined')); // "undefined"
parse(stringify(null)); // null
parse(stringify('null')); // "null"
parse(stringify(true)); // true
parse(stringify(100.1)); // 100.1
parse(stringify({ a: undefined, b: { c: null, d: [Infinity] } })); // { a: undefined, b: { c: null, d: [Infinity] } }
parse(stringify([{ a: NaN }, { b: [-Infinity, 1n] }])); // [{a:NaN}, {b: [-Infinity, 1n]}]

const input = [1, 2];
input.push(input);
expect(() => stringify(input)).toThrow(); // should throw for circular reference in array

const input = { a: { b: { c: 3 } } };
input.a.b.d = input.a;
expect(() => stringify(input)).toThrow(); // should throw for circular reference in object literals

/* -------------------------- Code Solution: -------------------------------- */
const wrap = (data, visited = new Set()) => {
  switch (typeof data) {
    case 'undefined':
      return {
        type: 'undefined',
        value: 'undefined',
      };
    case 'string':
      return {
        type: 'string',
        value: data,
      };
    case 'boolean':
      return {
        type: 'boolean',
        value: data,
      };
    case 'number':
      return {
        type: 'number',
        value: data.toString(),
      };
    case 'bigint':
      return {
        type: 'bigint',
        value: data.toString(),
      };
    case 'object':
      if (!visited.has(data)) {
        visited.add(data);

        if (data === null) {
          return {
            type: 'null',
            value: 'null',
          };
        }

        if (Array.isArray(data)) {
          return {
            type: 'Array',
            value: data.map((item) => wrap(item, visited)),
          };
        }

        return {
          type: 'ObjectLiteral',
          value: Object.entries(data).reduce(
            (acc, [key, val]) => ({
              ...acc,
              [key]: wrap(val, visited),
            }),
            {}
          ),
        };
      }
    default:
      throw new Error();
  }
};
const unwrap = (wrapper) => {
  switch (wrapper.type) {
    case 'null':
      return null;
    case 'undefined':
      return undefined;
    case 'string':
    case 'boolean':
      return wrapper.value;
    case 'number':
      return Number(wrapper.value);
    case 'bigint':
      return BigInt(wrapper.value);
    case 'Array':
      return wrapper.value.map(unwrap);
    case 'ObjectLiteral':
      return Object.entries(wrapper.value).reduce(
        (acc, [key, val]) => ({
          ...acc,
          [key]: unwrap(val),
        }),
        {}
      );
    default:
      throw new Error();
  }
};

const parse = (data) => unwrap(JSON.parse(data));
const stringify = (data) => JSON.stringify(wrap(data));
