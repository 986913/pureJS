/* Similaire to UniqueArrayI, but Different is should modify the array in place */

/*---------------用例测试-------------------*/
uniqueArray([
  1,
  5,
  'b',
  5,
  1,
  undefined,
  'a',
  'a',
  'a',
  'b',
  true,
  'true',
  false,
  {},
  {},
]); // [1,5,'b',undefined,'a',true,'true',false,{},{}]
uniqueArray([1, 1, 2]); // [1, 2]

/* ------------------- Soltion 1 ✅: two pointers -------------------------------- */
/**
 * @param {any[]} arr
 */
function deduplicate(arr) {
  arr.sort(); // 记得先sort

  let slow = 0;
  for (let fast = 1; fast < arr.length; fast++) {
    if (arr[slow] !== arr[fast]) {
      slow++;
      arr[slow] = arr[fast];
    }
  }

  arr.splice(slow + 1); //return unique arr
}

/* ------------------- Soltion 2: use Map -------------------------------- */
function deduplicate(arr) {
  const obj = new Map();

  let i = 0;
  while (i < arr.length) {
    if (obj.has(arr[i])) {
      arr.splice(i, 1); //如果重复了就删除
    } else {
      obj.set(arr[i], true);
      i++;
    }
  }

  return arr;
}
