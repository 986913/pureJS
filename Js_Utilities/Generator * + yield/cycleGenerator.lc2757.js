/**
 * @param {Array<number>} arr
 * @param {number} startIndex
 * @yields {number}
 */

var cycleGenerator = function* (arr, startIndex) {
  let len = arr.length;
  let idx = startIndex;
  while (true) {
    const jump = yield arr[idx]; // 当生成器恢复执行时，传入的值被赋给 jump 变量
    idx = (idx + (len + (jump % len))) % len; // 根据jump. 更新idx
  }
};

/**
 *  const gen = cycleGenerator([1,2,3,4,5], 0);
 *  gen.next().value  // 1
 *  gen.next(1).value // 2
 *  gen.next(2).value // 4
 *  gen.next(6).value // 5
 */
