/**
  Remove values：
  You are tasked with implementing a function called removeValues(arr1, arr2) that takes two arrays, arr1 and arr2, 
  and removes from arr1 all values that appear in arr2.

  The removeValues function should not modify arr2. 
  It should return a new array with the remaining values of arr1 after removing the values that appear in arr2. 
  The order of the values in the new array should be the same as in the original array.

  Directions
    The elements in the arrays can be of any type.
    The function should not modify arr1 or arr2.
    The function should be case-sensitive.
 */

/*---------------------------- 用例测试 ----------------------------*/
removeValues([1, 2, 3, 4, 5], [3, 4, 6]); //  [1, 2, 5]
removeValues([1, 2, 3, 4, 5], []); //  [1, 2, 3, 4, 5]
removeValues([1, 2, 3], [1, 2, 3]); //  []
removeValues([1, 2, 3, 4, 5], [6, 7]); //  [1, 2, 3, 4, 5]
removeValues([1, 2, 2, 3, 4, 4, 5], [2, 4]); //  [1, 3, 5]

/***************************** 非原地操作 ********************************/
export const removeValues = (arr1, arr2) => {
  let arr2Set = new Set(arr2);
  return arr1.filter((n) => !arr2Set.has(n));
};

/***************************** In-Place: Solution 1 - 用原生splice ********************************/
export const removeValues = (arr1, arr2) => {
  let arr2Set = new Set(arr2);
  //外层循环（决定删谁） -> 从后往前 i--
  for (let i = arr1.length - 1; i >= 0; i--) {
    if (arr2Set.has(arr1[i])) {
      arr1.splice(i, 1); //splice(startIdx, deleteCounts)
    }
  }
  return arr1;
};

/***************************** In-Place: Solution 2 - 自己模拟Solution1 ********************************/
export const removeValues = (arr1, arr2) => {
  let arr2Set = new Set(arr2);
  //外层循环（决定删谁） -> 从后往前 i--
  for (let i = arr1.length - 1; i >= 0; i--) {
    if (arr2Set.has(arr1[i])) {
      // 内层循环（执行移位） -> 从前往后 j++
      for (let j = i; j < arr1.length - 1; j++) {
        arr1[j] = arr1[j + 1];
      }
      arr1.length--;
    }
  }
  return arr1;
};

/***************************** In-Place: Solution 3 - Fast & Slow Two pointers ********************************/
export const removeValues = (arr1, arr2) => {
  let arr2Set = new Set(arr2);

  let slow = 0; // 慢指针：指向下一个需要存放有效元素的位置
  // 快指针fast：遍历整个数组
  for (let fast = 0; fast < arr1.length; fast++) {
    // 如果当前元素不需要删除，就把它移动到慢指针的位置
    if (!arr2Set.has(arr1[fast])) {
      arr1[slow] = arr1[fast];
      slow++; // 慢指针前进一步
    }
  }

  // 核心：截断数组，丢弃后面的无用元素
  arr1.length = slow;
  return arr1;
};
