/**
  You are asked to create a new mySetInterval(a, b) which has a different behavior from window.setInterval, 
  the time between calls is a linear function, growing larger and larger period = a + b * count.
 */
/* -------------------用例测试--------------------*/
let prev = Date.now();
const func = () => {
  const now = Date.now();
  console.log('roughly ', Date.now() - prev);
  prev = now;
};
const id = mySetInterval(func, 100, 200);
// roughly 100, 100 + 200 * 0
// roughly 400,  100 + 200 * 1
// roughly 900,  100 + 200 * 2
// roughly 1600,  100 + 200 * 3
// ....
myClearInterval(id); // stop the interval

/* -------------------------- Code Solution: -------------------------------- */
/**
 * @param {Function} func
 * @param {number} delay
 * @param {number} period
 * @return {number}
 */
function mySetInterval(func, delay, period) {
  let count = 0;
  let timerMap = {};

  const wrapper = () => {
    timerMap.id = setTimeout(() => {
      func();
      wrapper();
    }, delay + period * count);

    count++;
  };

  wrapper();
  return timerMap;
}

function myClearInterval(timerMap) {
  window.clearTimeout(timerMap.id);
}
