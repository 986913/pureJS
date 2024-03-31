// Lodash _.get documentation:  https://lodash.com/docs/4.17.15#chunk
/**
 * Implement a function chunk(array, [size=1]) that splits the input array into groups of length size and returns them within a new array.
 * If array can't be split evenly, the final chunk will be the remaining elements.
 * The function should not modify the original input array.
 * The function should return an empty array if the array argument is empty.
 */

/* -------------------用例测试--------------------*/
chunk(['a', 'b', 'c', 'd']); // => [['a'], ['b'], ['c'], ['d']]
chunk([1, 2, 3, 4], 2); // => [[1, 2], [3, 4]]
chunk([1, 2, 3, 4], 3); // => [[1, 2, 3], [4]]
chunk([1, 2, 3, 4, 5], 5); // => [[1, 2, 3, 4, 5]]
chunk([1, 2, 3, 4, 5], 10); // => [[1, 2, 3, 4, 5]]
chunk([1, 2, 3, 4, 5], 0); // => []

/* -------------------------- Code Solution: -------------------------------- */
/**
 * @param {Array} array - The array to process.
 * @param {number} [size=1] - The length of each chunk.
 * @returns {Array} - Returns the new array of chunks.
 */

function chunk(array, size = 1) {
  let result = [];
  let len = array.length;

  if (len === 0 || !array || !size) return result;

  let index = 0;
  while (index < len) {
    /* 如果原数组的长度len不是size的倍数，最后一个子数组的结束位置index + size > len，此时 slice() 方法会自动截取从index到数组末尾的所有元素，从而得到长度 <= size的最后一个子数组
        如果原数组的长度是size的倍数，则所有子数组的长度都将是size  */
    result.push(array.slice(index, index + size));
    index += size;
  }

  return result;
}
