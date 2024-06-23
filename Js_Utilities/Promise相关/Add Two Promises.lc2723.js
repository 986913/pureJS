/**
 * @param {Promise} promise1
 * @param {Promise} promise2
 * @return {Promise}

 * addTwoPromises(Promise.resolve(2), Promise.resolve(2))
 *   .then(console.log); // 4
 */

/*********************************Solution 1:  Promise.all ******************************************************/
var addTwoPromises = async function (promise1, promise2) {
  try {
    const [result1, result2] = await Promise.all([promise1, promise2]); //注意使用await
    return result1 + result2;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
/*********************************Solution 2:  Promise.all().then() *********************************************/
var addTwoPromises = async function (promise1, promise2) {
  try {
    let result;
    //注意使用await
    await Promise.all([promise1, promise2]).then(
      (res) => (result = res[0] + res[1])
    );
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
/*********************************Solution 3: use only await ******************************************************/
var addTwoPromises = async function (promise1, promise2) {
  try {
    let result = (await promise1) + (await promise2); //注意使用await, await能把promise变成object that contains value
    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
/*********************************Solution 4: Count promises ******************************************************/
var addTwoPromises = async function (promise1, promise2) {
  return new Promise((resolve, reject) => {
    let count = 0;
    let result = 0;

    [promise1, promise2].forEach(async (promise) => {
      try {
        const val = await promise;
        result += val;
        count++;

        if (count === 2) {
          resolve(result);
        }
      } catch (err) {
        reject(err);
      }
    });
  });
};
