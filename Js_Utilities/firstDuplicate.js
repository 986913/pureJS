/**
  Given a string which might have duplicate letters, write a function to find the first duplicate.
  What is the time & space cost of your approach ? Can you do better?
 */

/*-----------------用例测试--------------------*/
firstDuplicate('abca'); // 'a'
firstDuplicate('abcdefe'); // 'e'
firstDuplicate('abcdef'); // null
firstDuplicate(''); // null
firstDuplicate('a'); // mull

/* ----------------------------- Solution Code: Set -------------------------------- */
/**
 * @param {string} str
 * @return {string | null}
 */
function firstDuplicate(str) {
  if (str.length <= 1) return null;

  let set = new Set();
  for (let i = 0; i < str.length; i++) {
    if (set.has(str[i])) return str[i];
    set.add(str[i]);
  }

  return null;
}
