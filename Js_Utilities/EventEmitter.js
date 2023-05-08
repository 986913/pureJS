/**
 * In the observer pattern (also commonly known as the publish-subscribe model),
 * we can observe/subscribe to events emitted by publishers and execute code whenever an event happens.
 * Implement an EventEmitter class similar to the one in Node.js that follows such an observer pattern.
 **/
/* --------------------- 用例测试: 实现EventEmitter class----------------------- */
const emitter = new EventEmitter();

function addTwoNumbers(a, b) {
  console.log(`The sum is ${a + b}`);
}
emitter.on('foo', addTwoNumbers); //注册foo event,并且attach addTwoNumbers callback to it
emitter.emit('foo', 2, 5); // actuallty trigger foo event, all attached callbacks will be executed
// > "The sum is 7"

emitter.on('foo', (a, b) => console.log(`The product is ${a * b}`)); //注册foo event,并且attach new callback to it
emitter.emit('foo', 4, 5); // actuallty trigger foo event, all attached callbacks will be executed
// > "The sum is 9"
// > "The product is 20"

emitter.off('foo', addTwoNumbers); //注册foo event,un-attach addTwoNumbers callback to it
emitter.emit('foo', -3, 9); // actuallty trigger foo event, all attached callbacks will be executed
// > "The product is -27"

/*------------------------ code solution 1: class based ------------------------------*/
class EventEmitter {
  constructor() {
    // Creating objects via {} will include unwanted properties
    // on the prototype (such as `.toString`).
    this.events = Object.create(null);
    /* this.events长这样：
        就是装listern和event的容器而已： Function1,2,3是listener(倾听者callback)； foo,bar是event(听什么)
        events = {
          foo: [Function1, Function3],
          bar: [Function2],
        };
    */
  }

  on(eventName, listener) {
    if (!(eventName in this.events)) {
      this.events[eventName] = [];
    }

    this.events[eventName].push(listener);
    return this;
  }

  off(eventName, listener) {
    // Ignore non-existing eventNames.
    if (!(eventName in this.events)) {
      return this;
    }

    const listeners = this.events[eventName];

    // Find only first instance of the listener.
    const index = listeners.findIndex(
      (listenerItem) => listenerItem === listener
    );
    if (index < 0) {
      return this;
    }

    this.events[eventName].splice(index, 1);
    return this;
  }

  emit(eventName, ...args) {
    // Return false for non-existing eventNames or events without listeners.
    if (!(eventName in this.events) || this.events[eventName].length === 0) {
      return false;
    }

    // Make a clone of the listeners in case one of the listeners
    // mutates this listener array.
    const listeners = this.events[eventName].slice();
    listeners.forEach((listener) => {
      listener.apply(null, args);
    });

    return true;
  }
}

/*---------------code solution 2: function-prototyoe based ------------------------*/

function EventEmitter() {
  // Creating objects via {} will include unwanted properties on the prototype (such as `.toString`).
  this.events = Object.create(null);
  /* this.events长这样：就是装listern和event的容器而已： Function1,2,3是listener(倾听者)；foo,bar是event(听什么)
        events = {
          foo: [ Function1, Function3 ],
          bar: [ Function2 ],
        };
  */
}

EventEmitter.prototype.on = function (eventName, listener) {
  if (!(eventName in this.events)) {
    this.events[eventName] = [];
  }

  this.events[eventName].push(listener);
  return this;
};

EventEmitter.prototype.off = function (eventName, listener) {
  // Ignore non-existing eventNames.
  if (!(eventName in this.events)) {
    return this;
  }

  const listeners = this.events[eventName];

  // Find only first instance of the listener.
  const index = listeners.findIndex(
    (listenerItem) => listenerItem === listener
  );
  if (index < 0) {
    return this;
  }

  this.events[eventName].splice(index, 1);
  return this;
};

EventEmitter.prototype.emit = function (eventName, ...args) {
  // Return false for non-existing eventNames or events without listeners.
  if (!(eventName in this.events) || this.events[eventName].length === 0) {
    return false;
  }

  // Make a clone of the listeners in case one of the listeners
  // mutates this listener array.
  const listeners = this.events[eventName].slice();
  listeners.forEach((listener) => {
    listener.apply(null, args);
  });

  return true;
};
