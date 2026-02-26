/**
  you will be implementing a function called getLowerCase(word) that takes one argument: a word. 
  The function should return the word converted to lowercase.
  Directions - If the input word is empty, then return an empty string.
 */

/* -------------------用例测试--------------------- */
getLowerCase('HELLO'); // Output: 'hello'
getLowerCase('WoRlD'); // Output: 'world'
getLowerCase('tEsT'); // Output: 'test'

/**
 ************************************ Solution - 将字符串转换为小写 ************************************
 * @param {string} word - 要转换的字符串
 * @returns {string} - 转换后的小写字符串
 */
export const getLowerCase = (word) => {
  if (typeof word !== 'string') {
    throw new TypeError('Input must be a string');
  }

  let str = '';

  for (let i = 0; i < word.length; i++) {
    let char = word[i];
    let charCode = word.charCodeAt(i);

    //如果当前是小写字母
    if (charCode <= 122 && charCode >= 97) {
      str += char;
    } else {
      // 如果当前是大写字母，那么要大写准成小写
      str += String.fromCharCode(charCode + 32);
    }
  }

  return str;
};
