/**
  Compare two arrays:
    Implement a function called areArraysEqual(arr1, arr2) that compares two arrays arr1 and arr2 and returns a boolean indicating if they are equal or not.
    The function should perform a deep comparison of the elements in the arrays, 
    and return true only if both arrays have the same number of elements and each corresponding element in the arrays is equal.

  Directions
    Simple comparison === cannot be used to determine the equality of arrays. This is because the equality operator === only checks for reference equality, meaning that two arrays are considered equal only if they reference the same object in memory.
    The input arrays can contain only booleans, strings, and numbers
 */

const areArraysEqual = (arr1, arr2) => {
  if (Array.isArray(arr1) && Array.isArray(arr2)) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
      let isEqual = areArraysEqual(arr1[i], arr2[i]);
      if (isEqual === false) return false;
    }
    return true;
  }

  return arr1 === arr2;
};

/**
  时间复杂度- O(n)，其中 n 是数组的元素总数。
    每个元素只被访问一次（for 循环遍历 + 递归）
    但题目说元素只包含 boolean、string、number，所以不存在嵌套数组，递归只会在叶子节点触发 arr1 === arr2 然后返回
    如果允许嵌套数组，时间复杂度是 O(n)，n 为所有叶子节点总数（每个叶子只访问一次）。


  空间复杂度 - O(d)，d 是数组的最大嵌套深度。
    空间消耗来自递归调用栈，每一层递归对应一层嵌套
    当前题目限制元素只有基本类型，实际深度只有 1 层，所以退化为 O(1)
*/
