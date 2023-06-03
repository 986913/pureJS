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

/* -------------------------------- Code solution  -------------------------------------- */
/**
 * @param {*} valueA
 * @param {*} valueB
 * @return {boolean}
 */

const getType = (val) => Object.prototype.toString.call(val);

const shouldDeepCompare = (type) =>
  type === '[object Object]' || type === '[object Array]';

function deepEqual(valueA, valueB) {
  const typeA = getType(valueA);
  const typeB = getType(valueB);

  // 当valueA,valueB同时是array 或者 当valueA,valueB同时是object时： we traverse into them by calling `isEqual` again.
  if (typeA === typeB && shouldDeepCompare(typeA) && shouldDeepCompare(typeB)) {
    const kvPairsA = Object.entries(valueA);
    const kvPairsB = Object.entries(valueB);

    if (kvPairsA.length !== kvPairsB.length) return false;

    // Make sure the other objects have the same properties defined.
    return kvPairsA.every(
      ([key, val]) => Object.hasOwn(valueB, key) && deepEqual(val, valueB[key])
    );
  }

  return Object.is(valueA, valueB);
}
