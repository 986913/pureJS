/**
  实现JS中的Array.prototype.concat
 **/

/* -------------- usage test: -------------------------------- */
[1, 2, 3].myConcat([4, 5, 6]); // [1, 2, 3, 4, 5, 6]
[1, 2, 3].myConcat(4, 5, 6); // [1, 2, 3, 4, 5, 6]
[1, 2, 3].myConcat(4, [5, 6]); // [1, 2, 3, 4, 5, 6]
[1, 2, 3].myConcat(4, [5, [6]]); // [1, 2, 3, 4, 5, [6]]

/* -------------------------------- Solution -------------------------------- */
/**
 * @template T
 * @param {...(T | Array<T>)} items
 * @return {Array<T>}
 */
Array.prototype.myConcat = function (...items) {
  const newArray = [...this]; // 这里的this就是上面例子的[1,2,3]

  for (let i = 0; i < items.length; i++) {
    if (Array.isArray(items[i])) newArray.push(...items[i]); //只flat一层
    else newArray.push(items[i]);
  }

  return newArray;
};
