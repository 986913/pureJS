/**
  The intersectionBy function takes an iteratee function and multiple arrays as arguments. 
  It creates an array of unique values that are included in all given arrays based on the result of applying the iteratee function to each value. 
  The order and references of result values are determined by the first array.
  The iteratee function is invoked with one argument: value, where value is the current value being iterated.
 */

/* -------------------用例测试1--------------------*/
// Get the intersection based on the floor value of each number
const result = intersectionBy(Math.floor, [1.2, 2.4], [2.5, 3.6]); // => [2.4]

/* -------------------用例测试2--------------------*/
// Get the intersection based on the lowercase value of each string
const result2 = intersectionBy(
  (str) => str.toLowerCase(),
  ['apple', 'banana', 'orange'],
  ['Apple', 'Banana', 'Orange']
); // ['apple']

/* -------------------------- Code Solution： 没整明白题目啥意思。。。。 ------------------------------- */
/**
 * @param {Function} iteratee - The iteratee function to apply to each value.
 * @param {Array[]} arrays - The arrays to perform the intersection on.
 * @returns {Array} - A new array containing the unique values present in all given arrays.
 */
function intersectionBy(iteratee, ...arrays) {
  if (arrays.length === 0) return [];

  const mappedArrays = arrays.map((array) => array.map(iteratee));
  const intersectedValues = mappedArrays[0].filter((value) => {
    return mappedArrays.every((mappedArray) => mappedArray.includes(value));
  });

  return intersectedValues.map((value) => {
    const index = mappedArrays[0].indexOf(value);
    return arrays[0][index];
  });
}
