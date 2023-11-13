/**
  Implement a function that takes one or more values and returns a function that toggles between those values each time it's called.
 */
/* --------------------- 用例测试1 ----------------------- */
const hello = toggle('hello');
console.log(hello()); // "hello"
console.log(hello()); // "hello"
/* --------------------- 用例测试2 ----------------------- */
const onOff = toggle('on', 'off');
console.log(onOff()); // "on"
console.log(onOff()); // "off"
console.log(onOff()); // "on"
/* --------------------- 用例测3 ----------------------- */
const speed = toggle('slow', 'medium', 'fast');
expect(speed()).toBe('slow');
expect(speed()).toBe('medium');
expect(speed()).toBe('fast');

/* ---------------------------- Soltion -------------------------------- */
/**
 * @template T
 * @param  {...T} values
 *
 * @returns () => T
 */
function toggle(...values) {
  let index = 0;
  return function () {
    if (index > values.length - 1) index = 0;
    const result = values[index];
    index += 1;
    return result;
  };
}
