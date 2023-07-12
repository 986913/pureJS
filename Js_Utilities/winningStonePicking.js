/**
  There is a pile of `n` (n > 0) stones. Player A and Player B take turns to pick 1 or 2 stones from the pile. 
  A starts first. Who picks the last stone loses the game. 
  Now here is the question, is there a winning strategy for A or B ? If so, returns the player name. If there is none, return null.
 */

/* --------------------- 用例测试 ----------------------- */
winningStonePicking(1); // 'B'
winningStonePicking(2); // 'A'
winningStonePicking(3); // 'A'
winningStonePicking(4); // 'B'

/* -------------------------- Code Solution 1: 规律总结-------------------------------- */
/**
 * @param {number} n
 * @return {'A' | 'B' | null}
 */
function canWinStonePicking(n) {
  if (n === 0) return null;
  return n % 3 === 1 ? 'B' : 'A';
}
// n=1 : B
// n=2 : A
// n=3 : A
// n=4 : B
// n=5 : A
// n=6 : A
// n=7 : B
// n=8 : A
// n=9 : A

/* -------------------------- Code Solution 2: DP -------------------------------- */
function canWinStonePicking(n) {
  function whoWins(n, player, opposition) {
    if (n === 1) return opposition;
    if (n === 2 || n === 3) return player;
    if (
      whoWins(n - 1, opposition, player) === player ||
      whoWins(n - 2, opposition, player) === player
    ) {
      return player;
    } else {
      return opposition;
    }
  }

  return whoWins(n, 'A', 'B');
}

/* -------------------------- Code Solution 3:优化版 DP  -------------------------------- */
function canWinStonePicking(n) {
  const cache = {};

  function whoWins(n, player, opposition) {
    if (n === 1) return opposition;
    if (n === 2 || n === 3) return player;
    const key = `${n}_${player}_${opposition}`;
    if (key in cache) return cache[key];

    if (
      whoWins(n - 1, opposition, player) === player ||
      whoWins(n - 2, opposition, player) === player
    ) {
      cache[key] = player;
    } else {
      cache[key] = opposition;
    }

    return cache[key];
  }

  return whoWins(n, 'A', 'B');
}
