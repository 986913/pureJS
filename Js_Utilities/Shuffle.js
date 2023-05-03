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

/*-------- Code solution 1 -----------*/
function shuffle(arr) {
  let copied = arr.slice();
  while (copied.length) {
    let randomIdx = Math.floor(Math.random() * copied.length);
    [arr[randomIdx], arr[copied.length - 1]] = [
      arr[copied.length - 1],
      arr[randomIdx],
    ];
    copied.pop();
  }
}

/*-------- Code solution 2 -----------*/
/**
 * @param {any[]} arr
 * @returns {void}
 */
const getRandom = (max, min = 0) =>
  Math.floor(Math.random() * (max - min + 1) + min);

function shuffle(arr) {
  for (let i = arr.length - 1; i >= 0; i--) {
    const random = getRandom(i);
    [arr[i], arr[random]] = [arr[random], arr[i]];
  }
}
