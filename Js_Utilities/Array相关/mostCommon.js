/**
Most common
  In this coding challenge, you will be implementing a function mostCommon(words) that takes an array of strings words as its argument and should return the string that appears the most often. 
    If there are two or more elements that appear the same number of times, 
    then the function should the element whose’ first occurrence has a smaller index.

Directions
  If the input array is empty then return null.
  The input array can only contain strings and numbers.
**/

/* --------------------- 用例测试: 实现这种函数 ----------------------- */
mostCommon(['apple', 'banana', 'apple', 'cherry', 'banana', 'apple']); // "apple"
mostCommon(['apple', 'banana', 'apple', 'banana', 'banana', 'apple']); // "apple"

/* ------------------------ Solution: Hash map ----------------------------- */
export const mostCommon = (arr) => {
  const map = new Map();
  arr.forEach((word, idx) => {
    if (!map.has(word)) {
      map.set(word, { firstIdx: idx, count: 1 });
    } else {
      map.get(word).count++;
    }
  });

  let maxCount = 0;
  let minIdx = Infinity;
  let res = '';
  for (let [key, { firstIdx, count }] of map) {
    if (count > maxCount || (count === maxCount && firstIdx < minIdx)) {
      maxCount = count;
      minIdx = firstIdx;
      res = key;
    }
  }
  return res;
};
