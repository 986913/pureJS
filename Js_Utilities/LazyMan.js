/**
  LazyMan is very lazy, he only eats and sleeps.

  LazyMan(name: string, logFn: (log: string) => void) would output a message, the passed logFn is used.
  LazyMan('Jack', console.log) // Hi, I'm Jack.

  He can eat(food: string)
  LazyMan('Jack', console.log).eat('banana').eat('apple')
    // Hi, I'm Jack.
    // Eat banana.
    // Eat Apple.

  He also sleep(time: number), time is based on seconds.
  LazyMan('Jack', console.log).eat('banana').sleep(10).eat('apple').sleep(1)
    // Hi, I'm Jack.
    // Eat banana.
    // (after 10 seconds)
    // Wake up after 10 seconds.
    // Eat Apple.
    // (after 1 second)
    // Wake up after 1 second.

  He can sleepFirst(time: number), which has the highest priority among all tasks, no matter what the order is.
  LazyMan('Jack', console.log).eat('banana').sleepFirst(10).eat('apple').sleep(1)
    // (after 10 seconds)
    // Wake up after 10 seconds.
    // Hi, I'm Jack.
    // Eat banana
    // Eat apple
    // (after 1 second)
    // Wake up after 1 second.

  Please create such LazyMan()
 */

/* -------------------------- Code Solution -------------------------------- */
// interface Laziness {
//   sleep: (time: number) => Laziness
//   sleepFirst: (time: number) => Laziness
//   eat: (food: string) => Laziness
// }

// helper function:
async function sleepHelper(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('any thing');
    }, time);
  });
}

/**
 * @param {string} name
 * @param {(log: string) => void} logFn
 * @returns {Laziness}
 * Main function:
 */
function LazyMan(name, logFn) {
  const commands = [['greet', name]]; // inital commands

  const actions = {
    greet: (name) => logFn(`Hi, I'm ${name}.`),
    eat: (food) => logFn(`Eat ${food}.`),
    sleep: (ms) =>
      sleepHelper(ms * 1000).then(() =>
        logFn(`Wake up after ${ms} second${ms > 1 ? 's' : ''}.`)
      ),
  };

  Promise.resolve().then(run); //异步地调度执行 run 函数，以便按照 commands 数组中的顺序执行相应的操作。
  async function run() {
    for (const [cmd, val] of commands) {
      await actions[cmd](val);
    }
  }

  return {
    sleep(ms) {
      commands.push(['sleep', ms]);
      return this;
    },
    sleepFirst(ms) {
      commands.unshift(['sleep', ms]);
      return this;
    },
    eat(food) {
      commands.push(['eat', food]);
      return this;
    },
  };
}
