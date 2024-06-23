/**
 * @param {Function[]} functions
 * @param {number} k
 * @return {Promise<any>}

 * const sleep = (t) => new Promise(res => setTimeout(res, t));
 * promisePool([() => sleep(500), () => sleep(400)], 1)
 *            .then(console.log) // After 900ms
 */

/************************* Solution1: Async/Await + Promise.all() + Array.shift() **************************/
var promisePool = async function (functions, k) {
  //executeNext函数递归地执行每一个函数，确保当前的任务完成后才继续执行下一个任务。
  const executeNext = async () => {
    if (functions.length === 0) return; // Immediately returns if there are no functions to execute (the base case).

    const fn = functions.shift();
    await fn();
    await executeNext();
  };

  //(queue window size) 通过创建k个并发执行的Promise，确保最多同时执行k个任务。
  const promiseInpool = Array(k).fill().map(executeNext);
  // Promise.all(promiseInpool)等待所有并行任务完成后 再返回
  await Promise.all(promiseInpool);
};

/********************************* Solution 2:  Recursive Helper Function ******************************************************/
var promisePool = async function (functions, k) {
  return new Promise((resolve) => {
    let inProgressCount = 0; // 当前正在进行的任务数量
    let curIdx = 0; // 下一个要执行的函数索引

    // 辅助函数，负责管理任务的调度
    function helper() {
      if (curIdx >= functions.length) {
        // 检查是否所有任务都已调度
        if (inProgressCount === 0) resolve(); // 如果没有进行中的任务，解析Promise
        return; // 返回，不再调度新的任务
      }

      // 启动新的任务(并发体现在 inProgressCount < k)
      while (inProgressCount < k && curIdx < functions.length) {
        inProgressCount++; // 增加进行中的任务数量
        const promise = functions[curIdx](); // 获取并执行下一个函数
        curIdx++; // 增加函数索引

        promise.then(() => {
          // 当任务完成时
          inProgressCount--; // 减少进行中的任务数量
          helper(); // <---- recursion here: 调度新的任务
        });
      }
    }

    // 开始任务调度
    helper();
  });
};
