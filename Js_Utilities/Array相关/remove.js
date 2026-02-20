/**
In this coding challenge, you will be implementing a function called remove(array) that takes one argument: an array. 
The function should remove the last element from the input array and return the array.

Directions: If the input array is empty, return an empty array.
 */

/*-----------------用例测试--------------------*/
remove([1, 2, 3]); // Output: [1, 2]
remove(['foo', 'bar', 'baz']); // Output: ['foo', 'bar']

/* ---------------------------- Solution ------------------------------- */
export const remove = (array) => {
  if (array.length > 0) {
    array.length = array.length - 1;
  }
  return array;
};
