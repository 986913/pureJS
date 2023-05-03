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

/*-------- Code solution 1: old Fisher-yates algo -----------*/
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

/*-------- Code solution 2: modern Fisher-yates algo -----------*/
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const randIdx = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[randIdx]] = [arr[randIdx], arr[i]];
  }
  return arr;
}

// https://www.youtube.com/watch?v=4zx5bM2OcvA&t=57s&ab_channel=Insidecode
