/**
 * Your are given a 2-D array of characters. There is a hidden message in it.

    I B C A L K A
    D R F C A E A
    G H O E L A D 
  
    The way to collect the message is as follows:
      start at top left
      move diagonally down right
      when cannot move any more, try to switch to diagonally up right
      when cannot move any more, try switch to diagonally down right, repeat 3
      stop when cannot neither move down right or up right. the character on the path is the message
      for the input above, IROCLED should be returned.

    notes: if no characters could be collected, return empty string
 */

/* --------------------- 用例测试: 实现这种函数 ----------------------- */
const message = [
  ['I', 'B', 'C', 'A', 'L', 'K', 'A'],
  ['D', 'R', 'F', 'C', 'A', 'E', 'A'],
  ['G', 'H', 'O,', 'E', 'L', 'A', 'D'],
];
decode(message); // IROCLED

/* ------------------------------ Code solution ---------------------------------- */
function decode(message) {
  let result = '';
  if (!message || message.length === 0) return result; // edge case

  let rows = message.length;
  let cols = message[0].length;
  let i = 0;
  let j = 0;
  let isDown = true;

  while (i < rows && j < cols) {
    result += message[i][j];

    if (isDown && i === rows - 1) {
      // try switch to diagonally down right
      isDown = false;
    } else if (!isDown && i === 0) {
      // try to switch to diagonally up right
      isDown = true;
    }

    // keep moving in the current diagonal direction;
    i += isDown ? 1 : -1;
    j++;
  }

  return result;
}
