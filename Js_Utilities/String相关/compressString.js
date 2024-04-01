/* Given a string, compress the repeating letters with count number */

/* --------------------- 用例测试 ----------------------- */
compress('a'); // 'a'
compress('aa'); // 'a2'
compress('aaa'); // 'a3'
compress('aaab'); // 'a3b'
compress('aaabb'); // 'a3b2'
compress('aaabba'); // 'a3b2a'

/* -------------------- Code solution -------------------- */
/**
 * @param {string} str
 * @return {string}
 */
function compress(str) {
  let result = '';
  let count = 0;

  for (let i = 0; i < str.length; i++) {
    count += 1;

    if (str[i] !== str[i + 1]) {
      result += `${str[i]}${count === 1 ? '' : count}`;
      count = 0;
    }
  }

  return result;
}
