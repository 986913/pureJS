// This is a JavaScript Quiz from BFE.dev

(async () => {
  await Promise.all([]).then(
    (value) => {
      console.log(value); // resolves with empty array []
    },
    (error) => {
      console.log(error);
    }
  );

  await Promise.all([1, 2, Promise.resolve(3), Promise.resolve(4)]).then(
    (value) => {
      console.log(value); // all promises resolve so returns [1,2,3,4]
    },
    (error) => {
      console.log(error);
    }
  );

  await Promise.all([1, 2, Promise.resolve(3), Promise.reject('error')]).then(
    (value) => {
      console.log(value);
    },
    (error) => {
      console.log(error); // since 4th promise rejected, Promise.all also rejects with that value
    }
  );
})();

/**
  The Promise.all() method takes promises array as input, and returns a single Promise：
    - 如果在Promise数组中所有Promise被✅resolved后，"Promise.all"函数将返回一个promise, 装有all resolved values的数组
    - 如果在Promise数组中任意一个Promise被❌reject后  "Promise.all"函数将立即返回一个promise,装有reject结果,不会等待剩下的Promise对象的状态
 */
