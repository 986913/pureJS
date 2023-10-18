/**
  Implement a JavaScript function intersection(arrays) that takes multiple arrays as input and returns a new array containing the unique values that are present in all given arrays SameValueZero for equality comparisons. 
  The order and references of result values are determined by the first array.
 */

/* -------------------用例测试--------------------*/
const arr1 = [1, 2, 3];
const arr2 = [2, 3, 4];
const arr3 = [3, 4, 5];
intersection(arr1, arr2, arr3); // [3]

/* -------------------------- Code Solution ------------------------------- */
/**
 * Computes the intersection of arrays, returning a new array containing unique values present in all given arrays.
 *
 * @param {Array[]} arrays - The arrays to perform the intersection on.
 * @returns {Array} - A new array containing the unique values present in all given arrays.
 */

function intersection(...arrays) {
  if (arrays.length === 0) return [];

  const set = new Set(arrays[0]);
  for (let i = 1; i < arrays.length; i++) {
    // 注意是foreach Set在外圈，而不是array[i]在外圈
    set.forEach((val) => {
      if (!arrays[i].includes(val)) {
        set.delete(val);
      }
    });
  }

  return Array.from(set);
}
