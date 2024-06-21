/**
  atob() decodes a string of data which has been encoded using Base64 encoding.
  
  Please implement your own myAtob()
    myAtob('QkZFLmRldg==') // 'BFE.dev'
    myAtob('Q') // Error

  Please don't use atob() directly in your code.
 */
/* -------------------用例测试 --------------------*/
myAtob('QkZFLmRldg=='); // 'BFE.dev'
myAtob('Q'); // Error

/* -------------------------- Code Solution: 只是copy paste了答案，还没过答案的流程 -------------------------------- */
/**
 * @param {string} encoded
 * @return {string}
 */
function myAtob(encoded) {
  if (encoded === '') return '';

  const base64table =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

  const indexMap = new Map();
  for (let i = 0; i < base64table.length; i++) {
    indexMap.set(base64table[i], i);
  }
  let buffer = '';

  let isEqualMet = false;
  for (const char of encoded) {
    if (char === '=') {
      isEqualMet = true;
      continue;
    } else if (isEqualMet) {
      throw new Error('invalid =');
    }
    const index = indexMap.get(char);
    if (index == null) throw new Error('disallowed character');
    const binary = index.toString(2).padStart(6, '0'); // padStart(targetLength, padString)
    buffer += binary;
  }

  const chunkLength = 8;
  if (buffer.length < chunkLength) {
    throw new Error('invalid input');
  }

  let result = '';
  let start = 0;
  while (start < buffer.length) {
    const chunk = buffer.slice(start, start + chunkLength);
    const num = parseInt(chunk, 2);
    if (chunk.length === chunkLength) {
      const char = String.fromCharCode(num);
      result += char;
    } else {
      if (num !== 0) {
        throw new Error('invalid input');
      }
    }
    start += chunkLength;
  }

  return result;
}
