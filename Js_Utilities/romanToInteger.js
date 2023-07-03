/**
  Roman numerals are represented by combinations of following seven symbols, each with a fixed integer value.

  Symbol	I	 V	 X	  L	   C	  D	   M
  Value	  1	 5	 10	 50	  100	 500  1000

  For Standard form, subtractive notation is used, meaning 4 is IV rather than IIII, 9 is IX rather than VIIII. Same rule applies to 40(XL) and 900(CM) .etc.

  Simply speaking, the roman numerals in standard form follow these rules.
    1.symbols are listed from highest to lowest, from left to right
    2.from left to right, if the next symbol value is bigger than current one, it means subtracting, otherwise adding.
  
  Please implement romanToInt(). The input are all valid strings
 */

/* --------------------- 用例测试 ------------------------ */
romanToInt('CXXIII'); // 123
romanToInt('MCMXCIX'); // 1999
romanToInt('MMMCDXX'); // 3420

/* ----------------------------- Solution Code --------------------------------- */
const map = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000,
};

/**
 * @param {string} s
 * @return {number}
 */
function romanToInt(s) {
  let sum = 0;

  // step 1: loop throug s, then calulate sum
  for (let i = 0; i < s.length; i++) {
    let char = s[i];
    sum += map[char];
  }

  // step2: minus the extact part:
  if (s.includes('IV') || s.includes('IX')) sum -= 2;
  if (s.includes('XL') || s.includes('XC')) sum -= 20;
  if (s.includes('CD') || s.includes('CM')) sum -= 200;

  return sum;
}
