/**
  The intersectionWith function takes a custom comparator function and multiple arrays as arguments. 
  It compares the elements of the arrays using the comparator function to determine equality. 
  The function returns a new array containing the elements that are present in all given arrays
 */

/* -------------------用例测试--------------------*/
const arr1 = [
  { x: 1, y: 2 },
  { x: 2, y: 3 },
];
const arr2 = [
  { y: 2, x: 1 },
  { x: 3, y: 4 },
];

const result = intersectionWith(
  (a, b) => a.x === b.x && a.y === b.y,
  arr1,
  arr2
); // [{ x: 1, y: 2 }]

/* -------------------------- Code Solution ------------------------------- */
/**
 * @param {Function} comparator - The comparator function used to determine equality between elements.
 * @param {...Array} arrays - The arrays to perform the intersection on.
 * @returns {Array} - A new array containing the elements that are present in all given arrays.
 */
function intersectionWith(comparator, ...arrays) {
  if (arrays.length === 0) return [];

  const firstArr = arrays[0];

  return firstArr.filter((obj) => {
    return arrays.every((arr) =>
      arr.some((otherObj) => comparator(obj, otherObj))
    );
  });
}
