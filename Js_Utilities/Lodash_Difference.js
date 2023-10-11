// Lodash _.difference documentation:  https://lodash.com/docs/4.17.15#difference

/**
  Implement a function difference(array, values) that creates an array of array values not included in the other given arrays using SameValueZero for equality comparisons. 
  The order and references of result values are determined by the first array
 */

/* -------------------用例测试--------------------*/
difference([1, 2, 3], [2, 3]); // [1]
difference([1, 2, 3, 4], [2, 3, 1]); // [4]
difference([1, 2, 3], [2, 3, 1, 4]); // []
difference([1, , 3], [1]); //[3]
difference([1, 2, 3], []); // [1, 2, 3], The function should return the original array values if values is empty.

/* -------------------------- Code Solution: -------------------------------- */
/**
 * @param {Array} array - Array from which different elements are to be removed.
 * @param {Array} values - Array of values that are to be removed from the original array.
 * @return {Array} Returns filtered array.
 */
function difference(array, values) {
  const result = [];
  const set = new Set(values);

  for (let i = 0; i < array.length; i++) {
    // Check the value is not in valuesSet, and it's not an undefined value that is not at the same index in the array
    /* To handle sparse arrays such as [1, ,3], the in operator is used check if the index i is present in the array before checking if the value at index i is undefined. This ensures that sparse arrays are handled correctly. */
    if (!set.has(array[i]) && !(array[i] === undefined && !(i in array))) {
      result.push(array[i]);
    }
  }

  return result;
}
