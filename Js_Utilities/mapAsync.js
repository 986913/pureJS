/**
  By now you'd be familiar with mapping of elements in an array. If you aren't, please first do the Array.prototype.map question first.

  What if the mapping function is not a synchronous function i.e. it returns a promise? 
  Array.prototype.map assumes the mapping function is synchronous and will fail to work properly.

  Implement a function mapAsync that accepts an array of items and maps each element with an asynchronous mapping function. 
  The function should return a Promise which resolves to the mapped results.
 */

/* -------------------用例测试--------------------*/
const asyncDouble = (x) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(x * 2);
    }, 10);
  });

const doubled = await mapAsync([1, 2], asyncDouble);
console.log(doubled); // [2, 4]

/* -------------------------- Code Solution 1: use Promise.all -------------------------------- */

/* -------------------------- Code Solution 2: Count pending promises (Very similar to myPromiseAll) -------------------------------- */
/**
 * @param {Array<any>} arr
 * @param {Function} callbackFn
 *
 * @return {Promise}
 */
const mapAsync = (arr, callbackFn) => {
  return new Promise((resolve, reject) => {
    const results = new Array(arr.length);
    let pending = arr.length;

    if (pending === 0) {
      resolve(results);
      return;
    }

    arr.forEach((item, index) => {
      callbackFn(item)
        .then((value) => {
          results[index] = value;
          pending -= 1;

          if (pending === 0) resolve(results);
        })
        .catch((err) => reject(err));
    });
  });
};
