/**
  Please implement myExpect() to support toBe() and also not
    myExpect(3).toBe(3) // ✅
    myExpect(4).toBe(3) // ❌
    myExpect(3).not.toBe(3) // ❌
    myExpect(4).not.toBe(3) // ✅ 
 */

/* -------------------------- Code Solution 1: -------------------------------- */
/**
 * interface Matcher {
 *  toBe(data: any): void
 * }
 */
/**
 * @param {any} input
 * @returns {Matcher & {not: Matcher}}
 */
function myExpect(input) {
  const toBe = (arg) => {
    if (!Object.is(input, arg)) throw new Error('not match');
  };
  const notTobe = (arg) => {
    if (Object.is(input, arg)) throw new Error('no match');
  };

  return {
    not: { toBe: notTobe },
    toBe,
  };
}

/* -------------------------- Code Solution 2 -------------------------------- */
/**
 * interface Matcher {
 *  toBe(data: any): void
 * }
 */
/**
 * @param {any} input
 * @returns {Matcher & {not: Matcher}}
 */

function myExpect(input) {
  let isReversed = false; // use a flag to hold the mode of the matcher

  return {
    toBe(data) {
      const isIdentical = Object.is(data, input);
      if ((!isReversed && !isIdentical) || (isReversed && isIdentical)) {
        throw new Error('not match');
      }
    },
    get not() {
      isReversed = !isReversed;
      return this;
    },
  };
}
