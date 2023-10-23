// Lodash _.size documentation:  https://lodash.com/docs/4.17.15#size

/* -------------------用例测试--------------------*/
// Arrays.
size([1, 2, 3, 4, 5]); // => 5
// Object.
size({ a: 1, b: 2 }); // => 2
// Strings.
size('peanut'); // => 6
// Sets.
size(new Set([1, 2, 3])); // => 3
// Maps.
size(
  new Map([
    [1, 2],
    [3, 4],
  ])
); // => 2
// Undefined or null
size(null); // 0
size(undefined); // 0

/* -------------------------- Code Solution: -------------------------------- */
/**
 * Gets the size of `collection` by returning its length for array-like values or the number of own enumerable string keyed properties for objects.
 *
 * @param {Array | Object | Map | Set | string | null | undefined} collection The collection to inspect.
 * @returns {number} Returns the collection size.
 */
function size(collection) {
  if (collection === null || collection === undefined) return 0;

  if (Array.isArray(collection) || typeof collection === 'string') {
    return collection.length;
  }

  if (collection instanceof Map || collection instanceof Set) {
    return collection.size;
  }

  if (typeof collection === 'object') {
    return Object.keys(collection).length;
  }
}
