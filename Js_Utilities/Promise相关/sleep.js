/**
  Given a positive integer millis, write an asyncronous function that sleeps for millis milliseconds. It can resolve any value.
 */

/* --------------------- 用例测试 ----------------------- */
let t = Date.now();
sleep(100).then(() => console.log(Date.now() - t)); // 100

/**
 * @param {number} millis
 */
/*-------------------- Code solution ------------------*/
async function sleep(millis) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('any thing');
    }, millis);
  });
}
