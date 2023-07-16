/**
  Math.clz32() returns the number of leading zero bits in the 32-bit binary representation of a number.
 */
/*-------------------- 用例测试 -------------------------*/
clz32(1); // 31
clz32(10000); // 18
clz32(25.45); // 27

/* ------------------------- solution 1 ------------------------------- */
function clz32(num) {
  // this converts a number into the uint32
  num = num >>> 0;
  if (num === 0) return 32;
  return 32 - num.toString(2).length;
}

/* ------------------------- solution 2 ------------------------------- */
function clz32(num) {
  num = num >>> 0;

  if (num === 0) return 32;

  // keep track of the last "1" from the right to left
  let lastBitIndex = 0;

  for (let i = 1; i <= 32; i++) {
    if (num & 1) lastBitIndex = i;
    num >>= 1;
  }

  return 32 - lastBitIndex;
}
