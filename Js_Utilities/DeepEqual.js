/* ------ 用例测试 ---------- */
const v1 = 'foo';
const v2 = 'foo';
deepEqual(v1, v2); // true

const v3 = { id: 1 };
const v4 = { id: 1 };
deepEqual(v3, v4); // true

const v5 = [1, 2, 3];
const v6 = [1, 2, 3];
deepEqual(v5, v6); // true

const v7 = [{ id: '1' }];
const v8 = [{ id: '2' }];
deepEqual(v7, v8); // false

/* ------ 用例测试2 ---------- */
const a = [1, 2];
a[2] = a;
const b = [1, 2];
b[2] = b;
const c = [1, 2, [1, 2, a]];
const d = [1, 2, [1, 2, b]];
deepEqual(a, b); // true
deepEqual(a, c); // true
deepEqual(a, d); // true
deepEqual(b, c); // true
deepEqual(b, d); // true
deepEqual(c, d); // true

/* -------------------------------- Code solution  -------------------------------------- */
/**
 * @param {*} a
 * @param {*} b
 * @return {boolean}
 */

const getType = (val) => Object.prototype.toString.call(val);
const shouldDeepCompare = (type) =>
  type === '[object Object]' || type === '[object Array]';

function deepEqual(a, b, cache = new Map()) {
  const typeA = getType(a);
  const typeB = getType(b);

  // Check for circular reference, eg:用例测试2
  if (cache.has(a) || cache.has(b)) return true;
  cache.set(a, true);
  cache.set(b, true);

  // 当valueA,valueB同时是array 或者 当valueA,valueB同时是object时： we traverse into them by calling `isEqual` again.
  if (typeA === typeB && shouldDeepCompare(typeA)) {
    const kvPairsA = Object.entries(a);
    const kvPairsB = Object.entries(b);

    if (kvPairsA.length !== kvPairsB.length) return false;

    // Make sure the other objects have the same properties defined.
    return kvPairsA.every(([key, value]) => {
      return b.hasOwnProperty(key) && deepEqual(value, b[key], cache);
    });
  }

  return Object.is(a, b);
}
