/* --------------------- 用例测试 ----------------------- */
[1, 2, 3].myUnshift(0); // 原数组变成[0, 1, 2, 3]， 函数返回长度4
['foo', 'bar'].myUnshift('baz'); // 原数组变成['baz', 'foo', 'bar']， 函数返回长度3
[1, 2, 3].myUnshift(1, 2, 3); // 原数组变成[1, 2, 3, 1, 2, 3]， 函数返回长度6

/*
  👉🏻 考点：
  1. 通过this来获取数组
  2. in-Place修改数组
*/

/* --------------------- Code --------------------------------- */
Array.prototype.myUnshift = function (...args) {
  const insertCount = args.length;

  // 如果没有传入任何参数，直接返回当前长度，什么都不做
  if (insertCount === 0) {
    return this.length;
  }

  // 第一步：把原数组的所有元素向右平移 insertCount 个位置
  // 同样必须从后往前遍历！
  for (let i = this.length - 1; i >= 0; i--) {
    // 新位置 = 原位置 + 插入的元素个数
    this[i + insertCount] = this[i];
  }

  // 第二步：把传入的新元素，按顺序填补到头部空出来的那些位置里
  for (let i = 0; i < insertCount; i++) {
    this[i] = args[i];
  }

  // 第三步：返回新的数组长度
  return this.length;
};
