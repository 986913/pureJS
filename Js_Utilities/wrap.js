/**
  Python supports negative list index , while JavaScript doesn't.
  Can you write a wrapper function to make negative array index possible?
    const originalArr = [1,2,3]
    const arr = wrap(originalArr)
    arr[0] // 1
    arr[1] // 2
    arr[2] // 3
    arr[3] // undefined
    arr[-1] // 3
    arr[-2] // 2
    arr[-3] // 1
    arr[-4] // undefined

  All methods on arr should be applied to the original array, which means:
    arr.push(4)
    arr[3] // 4
    originalArr[3] // 4

    arr.shift()
    arr[0] // 2
    originalArr[0] // 2

    arr.bfe = 'bfe'
    originalArr.bfe // 'bfe'

    arr[-1] = 5
    arr // [2,3,5]
    originalArr // [2,3,5]

    originalArr[2] = 6
    arr // [2,3,6]
    originalArr // [2,3,6]
 */
/* ----------------------------------------用例测试---------------------------------------- */
const originalArr = [1, 2, 3];
const arr = wrap(originalArr);

arr[0]; // 1
arr[1]; // 2
arr[2]; // 3
arr[3]; // undefined
arr[-1]; // 3
arr[-2]; // 2
arr[-3]; // 1
arr[-4]; // undefined

arr.push(4);
arr[3]; // 4
originalArr[3]; // 4
arr.shift();
arr[0]; // 2
originalArr[0]; // 2
arr.bfe = 'bfe';
originalArr.bfe; // 'bfe'
arr[-1] = 5;
arr; // [2,3,5]
originalArr; // [2,3,5]
originalArr[2] = 6;
arr; // [2,3,6]
originalArr; // [2,3,6]

//https://www.youtube.com/watch?time_continue=506&v=KjoJNLQ-WDY&embeds_referring_euri=https%3A%2F%2Fbigfrontend.dev%2F&source_ve_path=MTM5MTE3LDEyNzI5OSwxMzkxMTcsMTM5MTE3LDEzOTExNywxMzkxMTcsMTM5MTE3LDI4NjY2&feature=emb_logo&ab_channel=JSer
/*----------------------------- Code solution 1: use Proxy class ---------------------------------------*/
/**
 * @param {any[]} arr
 * @returns {?} - sorry no type hint for this
 */

function wrap(arr) {
  return new Proxy(arr, {
    get(target, prop) {
      //if use as iterable:
      if (prop === Symbol.iterator) {
        return target[prop].bind(target);
      }

      let index = parseInt(prop, 10);
      if (index < 0) {
        index += arr.length;
        return target[index];
      }

      return target[prop];
    },
    set(target, prop, val) {
      let index = parseInt(prop, 10);
      if (index < 0) {
        index += arr.length;
        target[index] = val;

        if (index < 0) {
          throw new Error('index is overflow');
        }
        return true;
      }
      target[prop] = val;
      return true;
    },
  });
}

/*----------------------------- Code solution 2: use Proxy class + Reflect ---------------------------------------*/
const isNumber = (prop) =>
  typeof prop === 'string' && !Number.isNaN(Number(prop));
const normalize = (idx, arrLength) => (idx >= 0 ? idx : idx + arrLength);
const assert = (idx) => {
  if (idx < 0) throw new Error('incorrect index');
};

function wrap(arr) {
  return new Proxy(arr, {
    get(target, prop, receiver) {
      if (isNumber(prop)) {
        prop = normalize(Number(prop), target.length);
      }
      return Reflect.get(target, prop, receiver);
    },

    set(target, prop, value, receiver) {
      if (isNumber(prop)) {
        prop = normalize(Number(prop), target.length);
        assert(prop);
      }
      return Reflect.set(target, prop, value, receiver);
    },
  });
}
