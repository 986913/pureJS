/**
  btoa() accepts a binary string and returns a Base64-encoded ASCII string from it. Characters in a binary string are the ASCII character for each byte of the binary data.
  Please read Base64 wiki and implement your own btoa().
    myBtoa('BFE') // 'QkZF'
    myBtoa('BFE.dev') // 'QkZFLmRldg=='
  
  note:
    Please don't use window.btoa() in your code.
    The binary string passed to your function are all valid ASCII characters, there will be another problem on the general Base64 encoding/decoding.
 */
/* -------------------用例测试 --------------------*/
myBtoa('BFE'); // 'QkZF'
myBtoa('BFE.dev'); // 'QkZFLmRldg=='

/* -------------------------- Code Solution: 只是copy paste了答案，还没过答案的流程 -------------------------------- */
/**
 * @param {string} str - binary string
 * @returns {string}
 */
function myBtoa(str) {
  let result = '';

  const base64table =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

  // keep slicing by 3 character
  while (str.length > 0) {
    const buffer = [];
    const first3 = str.slice(0, 3);
    str = str.slice(3);
    let bits = '';
    for (let char of first3) {
      bits += char.charCodeAt(0).toString(2).padStart(8, '0'); // padStart(targetLength, padString)
    }
    // keep slicing 6 bits
    while (bits.length > 0) {
      const first6 = bits.slice(0, 6).padEnd(6, '0');
      bits = bits.slice(6);
      const char = base64table[parseInt(first6, 2)];
      buffer.push(char);
    }

    // add the padding
    if (buffer.length < 4) {
      buffer.push('='.repeat(4 - buffer.length));
    }

    result += buffer.join('');
  }

  return result;
}
