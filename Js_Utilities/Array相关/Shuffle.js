/*-------用例测试--------------------*/
const arr = [1, 2, 3, 4];
shuffle(arr);
/* there would be possibly 4! = 24 permutations
[1, 2, 3, 4]
[1, 2, 4, 3]
[1, 3, 2, 4]
[1, 3, 4, 2]
[1, 4, 2, 3]
[1, 4, 3, 2]
[2, 1, 3, 4]
[2, 1, 4, 3]
[2, 3, 1, 4]
[2, 3, 4, 1]
[2, 4, 1, 3]
[2, 4, 3, 1]
[3, 1, 2, 4]
[3, 1, 4, 2]
[3, 2, 1, 4]
[3, 2, 4, 1]
[3, 4, 1, 2]
[3, 4, 2, 1]
[4, 1, 2, 3]
[4, 1, 3, 2]
[4, 2, 1, 3]
[4, 2, 3, 1]
[4, 3, 1, 2]
[4, 3, 2, 1]
*/

/*-------- Code solution : Fisher-yates algo -----------*/
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const randIdx = Math.floor(Math.random() * (i + 1)); // 在前i+1个元素中随机选择一个
    [arr[i], arr[randIdx]] = [arr[randIdx], arr[i]]; // 交换当前元素和随机元素的位置
  }
  return arr;
}

// https://www.youtube.com/watch?v=4zx5bM2OcvA&t=57s&ab_channel=Insidecode
/**
 * 当我们需要对数组进行洗牌操作时，可以使用 Fisher-Yates shuffle 算法，
 * 其核心思想是从数组的末尾开始，将当前元素与尚未处理的元素中的一个随机元素交换位置。
 * 通过将数组元素交换的方式进行洗牌，可以确保每个元素都有相等的概率被选择，并且不会重复选择
 */
