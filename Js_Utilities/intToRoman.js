/**
 * 这道题就靠死记硬背了
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
 */

/* --------------------- 用例测试 ------------------------ */
intToRoman(123); // "CXXIII"
intToRoman(1999); // "MCMXCIX"
intToRoman(3420); // "MMMCDXX"

/*------------------------- Solution: Leetcode 12原题  ----------------------- */
/**
 * @param {number} num
 * @return {string}
 */

var intToRoman = function (num) {
  // '', 1000, 2000, 3000   因为题目给定的num范围是[1，3999]
  let qian = ['', 'M', 'MM', 'MMM'];

  // '', 100, 200,   300,  400,  500, 600,  700,    800,   900
  let bai = ['', 'C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM'];

  // '', 10,  20,   30,    40,  50,   60,   70,     80,    90
  let shi = ['', 'X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC'];

  // '',  1,   2,     3,    4,    5,   6,     7,     8,      9
  let ge = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'];

  const qianwei = qian[Math.trunc(num / 1000)] || '';
  const baiwei = bai[Math.trunc((num / 100) % 10)] || '';
  const shiwei = shi[Math.trunc((num / 10) % 10)] || '';
  const gewei = ge[num % 10];

  //     qian[千]+ bai[百] + shi[十] + ge[个]
  return qianwei + baiwei + shiwei + gewei;
};
