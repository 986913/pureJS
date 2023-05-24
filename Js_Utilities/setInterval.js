/**
  This is a follow-up on setTimeout - FakeTimer

  Like setTimeout, setInterval also is not accurate. (please refer Event Loop for detail). This is OK in general web application, but might be problematic in test.

  ❗ Could you implement your own `setInterval()` and `clearInterval()` to be sync ❗ ? 
  so that they have accurate timing for test. This is what [FakeTimes](https://github.com/sinonjs/fake-timers) are for.

  By "accurate", it means suppose all functions cost no time, 
  we start our function at time `0`, then `setInterval(func1, 100)` would schedule `func1` exactly at `100 200 300 etc`. 
  
  You need to replace `Date.now()` as well to provide the time.

  class FakeTimer {
    install() {
      // replace window.setInterval, window.clearInterval, Date.now  with your implementation
    }
    
    uninstall() {
      // restore the original implementation of window.setInterval, window.clearInterval, Date.now
    }
    
    tick() {
      // run the scheduled functions without waiting
    }
  }
 **/
/* --------------------- 用例测试 ----------------------- */
const fakeTimer = new FakeTimer();
fakeTimer.install();

const logs = [];
const log = () => logs.push(Date.now());

let count = 0;
const id = setInterval(() => {
  if (count > 1) {
    clearInterval(id);
  } else {
    log();
  }
  count += 1;
}, 100);
// log 'A' at every 100, stop at 200
fakeTimer.tick();
fakeTimer.uninstall();
console.log(logs); // [100, 200]

/* -------------------------- Solution --------------------------- */
class FakeTimer {
  constructor() {
    this.original = {
      setInterval: window.setInterval,
      clearInterval: window.clearInterval,
      now: Date.now,
    };
    this.timerId = 0;
    this.currentTime = 0;
    this.queue = [];
  }

  // replace window.setInterval, window.clearInterval, Date.now with your implementation
  install() {
    window.setInterval = (cb, time, ...args) => {
      const id = this.timerId++;
      this.queue.push({
        id,
        cb,
        time: time + this.currentTime,
        args,
        wait: time, // < --- diff
      });
      return id;
    };

    window.clearInterval = (removeId) => {
      this.queue = this.queue.filter(({ id }) => id !== removeId);
    };

    Date.now = () => this.currentTime;
  }

  // restore the original implementation of window.setInterval, window.clearInterval, Date.now
  uninstall() {
    window.setInterval = this.original.setInterval;
    window.clearInterval = this.original.clearInterval;
    Date.now = this.original.now;
  }

  // run the scheduled functions without waiting
  tick() {
    while (this.queue.length) {
      this.queue.sort((a, b) => a.time - b.time); // <-- diff:  sort here since the queue could have updated new task in

      const { cb, time, args, id, wait } = this.queue.shift();
      this.currentTime = time;
      // diff is here --->  keep pusing into queue
      this.queue.push({
        id,
        cb,
        args,
        wait,
        time: this.currentTime + wait,
      });
      cb(...args);
    }
  }
}
