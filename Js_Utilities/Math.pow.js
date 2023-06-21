/**
  Can you write your own Math.pow() ? The power would only be integers.
  Follow-up:
    You can easily solve this problem by multiplying the base one after another, but it is slow. 
    For power of `n`, it is needed to do the multiplication `n` times, can you think of a faster solution ?
 */
/*-------------------- 用例测试 -------------------------*/
pow(1, 2); // 1
pow(2, 10); // 1024
pow(4, -1); // 0.25

/* ------------------------- Code solution ------------------------------- */
function pow(base, exponent) {
  if (exponent < 0) return 1 / pow(base, -exponent);
  if (exponent === 0) return 1;

  return base * pow(base, exponent - 1);
}
