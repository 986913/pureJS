/**
 * Implement a function that returns a new object after squashing the input object into a single level of depth where nested keys are "squashed" together with a period delimiter (.).
 */
/* --------------------用例测试1-----------------*/
const object1 = {
  a: 5,
  b: 6,
  c: {
    f: 9,
    g: {
      m: 17,
      n: 3,
    },
  },
};
squashObject(object1); // { a: 5, b: 6, 'c.f': 9, 'c.g.m': 17, 'c.g.n': 3 }
/* --------------用例测试2-------------------*/
const object2 = {
  a: { b: null, c: undefined },
};
squashObject(object2); // { 'a.b': null, 'a.c': undefined }
/* --------------用例测试3-------------------*/
const object3 = { a: { b: [1, 2, 3], c: ['foo'] } };
squashObject(object3); // { 'a.b.0': 1, 'a.b.1': 2, 'a.b.2': 3, 'a.c.0': 'foo' }

/* ------------------ Solution Code ---------------------------------------------------- */
/**
 * @param {Object} obj
 * @param {Array} path
 * @param {Object} output
 * @return {Object}
 */

function squashObject(object, path = [], output = {}) {
  for (const [key, value] of Object.entries(object)) {
    // when value is primitive: Add props with glued/squashed keys.
    if (typeof value !== 'object' || value === null) {
      output[path.concat(key).filter(Boolean).join('.')] = value;
    } else {
      // when value is arr or object: Recursion by calling squashObject.
      squashObject(value, path.concat(key), output);
    }
  }

  return output;
}
