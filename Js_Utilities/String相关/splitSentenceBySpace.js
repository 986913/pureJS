/**
 * Splits a string by a single space character (' ').
 *
 * This function mimics `String.prototype.split(' ')` behavior
 * for basic space-separated input. Consecutive spaces will
 * produce empty string elements in the result.
 *
 * Notes:
 * - Only splits on the literal space character (' ').
 * - Does NOT trim leading/trailing spaces.
 * - Other characters (e.g., ',', '.', '-') are treated as normal characters.
 */

/* -------------------------------------用例测试------------------------------------- */
splitSentence('a b c'); // ["a", "b", "c"]
splitSentence('a b  c'); // ["a", "b", "", "c"]
splitSentence('The quick  brown fox'); // ["The", "quick", "", "brown", "fox"]
splitSentence('a,b,c'); // ["a,b,c"]
splitSentence('a.b-c'); // ["a.b-c"]
splitSentence('ab c'); // ["ab", "c"]
splitSentence('a-b-c'); // ["a-b-c"]

/* ------------------------------------ Solution  -------------------------------------------- */
const splitSentence = (sentence) => {
  let res = [];

  let curWord = '';
  for (let char of sentence) {
    if (char === ' ') {
      res.push(curWord);
      curWord = '';
    } else {
      curWord += char;
    }
  }

  curWord && res.push(curWord);
  return res;
};
