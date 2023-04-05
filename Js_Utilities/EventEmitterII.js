/**
 * The difference between this question and Event Emitter I question is the way listeners are unsubscribed.
 * In this version, there's no emitter.off() method available on the EventEmitter instance.
 * Instead, emitter.on() returns an object that has an off() method.

    Example usage of the EventEmitter class:

    const emitter = new EventEmitter();

    function addTwoNumbers(a, b) {
      console.log(`The sum is ${a + b}`);
    }

    // Returns a subscription object that has an .off() method.
    const sub = emitter.on('foo', addTwoNumbers);
    emitter.emit('foo', 2, 5);
    // > "The sum is 7"

    // Returns a subscription object that has an .off() method.
    emitter.on('foo', (a, b) => {
      console.log(`The product is ${a * b}`);
    });
    emitter.emit('foo', 4, 5);
    // > "The sum is 9"
    // > "The product is 20"

    sub.off(); // This unsubscribes the callback that logs the sum of the numbers.
    emitter.emit('foo', -3, 9);
    // > "The product is -27" (Only the multiply callback is triggered, the first one was unsubscribed.)
 */

/*------------------------ code solution ------------------------------*/
class EventEmitter {
  constructor() {
    // Creating objects via {} will include unwanted properties on the prototype (such as `.toString`).
    this.events = Object.create(null);
    /* this.events长这样：就是装listern和event的容器而已： Function1,2,3是listener(倾听者)； foo,bar是event(听什么)
        events = {
          foo: {
            0: Function1,
            2: Function3
          },
          bar: {
            0: Function1,
            1: Function2
          },
        };
    */
    this._key = 0; // <--- difference
  }

  on(eventName, listener) {
    if (!(eventName in this.events)) {
      this.events[eventName] = {};
    }

    const listenerId = this._key;
    this.events[eventName][listenerId] = listener;
    this._key++;

    return {
      // Use arrow function so that `this` is preserved.
      off: () => delete this.events[eventName][listenerId],
    };
  }

  emit(eventName, ...args) {
    // Early return for non-existing eventNames or events without listeners.
    if (
      !(eventName in this.events) ||
      Object.keys(this.events[eventName]).length === 0
    ) {
      return;
    }

    // Make a clone of the listeners in case one of the listeners calls sub.off() and changes the listeners.
    const listeners = { ...this.events[eventName] };
    Object.values(listeners).forEach((listener) => {
      listener.apply(null, args);
    });
  }
}
