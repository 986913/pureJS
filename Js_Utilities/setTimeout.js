/**
  `setTimeout` adds task in to a task queue to be handled later, the time actually is no accurate. ([Event Loop](https://javascript.info/event-loop)). 
  This is OK in general web application, but might be problematic in test. For example, at [5. implement throttle() with leading & trailing option](https://bigfrontend.dev/problem/implement-throttle-with-leading-and-trailing-option) we need to test the timer with more accurate approach.

  ❗ Could you implement your own `setTimeout()` and `clearTimeout()` to be sync ❗ ? 
  so that they have accurate timing for test. This is what [FakeTimes](https://github.com/sinonjs/fake-timers) are for.

  By "accurate", it means suppose all functions cost no time, 
  we start our function at time `0`, then `setTimeout(func1, 100)` would schedule `func1` exactly at `100`. 
  You need to replace `Date.now()` as well to provide the time.

  class FakeTimer {
    install() {
      // setTimeout(), clearTimeout(), and Date.now() are replaced
    }

    uninstall() {
      // restore the original APIs
      // setTimeout(), clearTimeout() and Date.now()
    }

    tick() {
      // run all the schedule functions in order
    }
  }

 **/
/* --------------------- 用例测试 ----------------------- */
const fakeTimer = new FakeTimer();
fakeTimer.install();

const logs = [];
const log = (arg) => logs.push([Date.now(), arg]);

setTimeout(() => log('A'), 100); // log 'A' at 100

const b = setTimeout(() => log('B'), 110);
clearTimeout(b); // b is set but cleared

setTimeout(() => log('C'), 200);

console.log(logs); // [ [100, 'A'],[200, 'C'] ]
fakeTimer.uninstall();

/* -------------------------- Solution --------------------------- */
class FakeTimer {
  constructor() {
    this.original = {
      setTimeout: window.setTimeout,
      clearTimeout: window.clearTimeout,
      dateNow: Date.now,
    };
    this.timerId = 1;
    this.currentTime = 0;
    this.queue = [];
  }

  // replace window.setTimeout, window.clearTimeout, Date.now with your implementation
  install() {
    window.setTimeout = (cb, time, ...args) => {
      const id = this.timerId++;
      this.queue.push({
        id,
        cb,
        time: time + this.currentTime,
        args,
      });
      this.queue.sort((a, b) => a.time - b.time);
      return id;
    };

    window.clearTimeout = (removeId) => {
      this.queue = this.queue.filter(({ id }) => id !== removeId);
    };

    Date.now = () => {
      return this.currentTime;
    };
  }

  // restore the original implementation of window.setTimeout, window.clearTimeout, Date.now
  uninstall() {
    window.setTimeout = this.original.setTimeout;
    window.clearTimeout = this.original.clearTimeout;
    Date.now = this.original.dateNow;
  }

  // run the scheduled functions without waiting
  tick() {
    while (this.queue.length) {
      const { cb, time, args } = this.queue.shift();
      this.currentTime = time;
      cb(...args);
    }
  }
}
