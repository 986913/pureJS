/**
  [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) is widely used nowadays, hard to think how we handled [Callback Hell](http://callbackhell.com/) in the old times.
  Can you implement a `MyPromise` Class by yourself?

  At least it should match following requirements
    1. new promise: `new MyPromise((resolve, reject) => {})`
    2. chaining : `MyPromise.prototype.then()` *[then handlers](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then) should be called asynchronously*
    3. rejection handler: `MyPromise.prototype.catch()`
    4. static methods: `MyPromise.resolve()`, `MyPromise.reject()`.

  This is a challenging problem. Recommend you read about Promise thoroughly first.
 */

/*-------------------------用例测试1--------------------*/
let test = new MyPromise((resolve, reject) => {
  resolve('成功');
});

test.then(
  (res) => console.log(res),
  (res) => console.log(res.message)
);

/*-------------------------用例测试2--------------------*/
let test2 = new MyPromise((resolve, reject) => {
  throw new Error('白嫖失败');
});

test2.then(
  (res) => console.log(res),
  (res) => console.log(res.message)
);

/*-------------------------用例测试3--------------------*/
let test3 = new MyPromise((resolve, reject) => {
  resolve('成功');
});

test3.then();

/*-------------------------用例测试4--------------------*/
console.log('第1步');

let test4 = new MyPromise((resolve, reject) => {
  console.log('第2步');
  resolve('成功');
});

test4.then(
  (res) => console.log(res),
  (res) => console.log(res.message)
);

console.log('第3步');

/*-------------------------用例测试5--------------------*/
console.log('第1步');

let test5 = new MyPromise((resolve, reject) => {
  console.log('第2步');

  setTimeout(() => {
    resolve('成功');
    reject('失败');
    console.log('第4步');
  });
});

test5.then(
  (res) => console.log(res),
  (res) => console.log(res.message)
);

console.log('第3步');

/*-------------------------用例测试6--------------------*/
let test6 = new MyPromise((resolve, reject) => {
  resolve('成功');
});

test6
  .then(
    (res) => console.log(res),
    (res) => console.log(res.message)
  )
  .then(
    (res) => console.log(res),
    (res) => console.log(res.message)
  );

/* ------------------------------------ Code solution ---------------------------------------- */

const STATE = {
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected',
  PENDING: 'pending',
};

class MyPromise {
  #thenCbs = [];
  #catchCbs = [];
  #state = STATE.PENDING; // contain FULFILLED  REJECTED PENDING
  #value; // contain value for onSuccess, onFail
  #onSuccessBind = this.#onSuccess.bind(this);
  #onFailBind = this.#onFail.bind(this);

  constructor(executor) {
    try {
      executor(this.#onSuccessBind, this.#onFailBind);
    } catch (e) {
      this.#onFail(e);
    }
  }
  /* ----------------------------- Below are private methods ----------------------------- */
  #runCallbacks() {
    if (this.#state === STATE.FULFILLED) {
      this.#thenCbs.forEach((callback) => {
        callback(this.#value);
      });

      this.#thenCbs = [];
    }

    if (this.#state === STATE.REJECTED) {
      this.#catchCbs.forEach((callback) => {
        callback(this.#value);
      });

      this.#catchCbs = [];
    }
  }
  //对应new MyPromise((resolve, reject) => {})中的resolve function
  #onSuccess(value) {
    queueMicrotask(() => {
      if (this.#state !== STATE.PENDING) return; //说明onSuccess已经被call过了

      if (value instanceof MyPromise) {
        value.then(this.#onSuccessBind, this.#onFailBind);
        return;
      }

      this.#value = value;
      this.#state = STATE.FULFILLED;
      this.#runCallbacks();
    });
  }
  //对应new MyPromise((resolve, reject) => {})中的reject function
  #onFail(value) {
    queueMicrotask(() => {
      if (this.#state !== STATE.PENDING) return; //说明onFail已经被call过了

      if (value instanceof MyPromise) {
        value.then(this.#onSuccessBind, this.#onFailBind);
        return;
      }

      if (this.#catchCbs.length === 0) {
        console.error('error' + value);
      }

      this.#value = value;
      this.#state = STATE.REJECTED;
      this.#runCallbacks();
    });
  }
  /* ----------------------------- Below are public methods ----------------------------- */
  // 对应： promise实例.then( res => console.log(res), err => console.log(err.message) );
  then(thenCb, catchCb) {
    // return new MyPromise is allow infinite chaining
    return new MyPromise((resolve, reject) => {
      this.#thenCbs.push((result) => {
        if (thenCb == null) {
          resolve(result);
          return;
        }

        try {
          resolve(thenCb(result));
        } catch (error) {
          reject(error);
        }
      });

      this.#catchCbs.push((result) => {
        if (catchCb == null) {
          reject(result);
          return;
        }

        try {
          resolve(catchCb(result));
        } catch (error) {
          reject(error);
        }
      });

      this.#runCallbacks();
    });
  }
  // 对应： promise实例.catch(err => console.log(err));
  catch(cb) {
    return this.then(undefined, cb);
  }

  finally(cb) {
    return this.then(
      (result) => {
        cb(); // finally never take a result
        return result;
      },
      (result) => {
        cb(); // finally never take a result
        throw result;
      }
    );
  }
  /* ----------------------------- Below are static methods ----------------------------- */

  static resolve(value) {
    return new Promise((resolve) => resolve(value));
  }

  static reject(value) {
    return new Promise((resolve, reject) => reject(value));
  }

  static all(promises) {
    return new Promise((resolve, reject) => {
      const results = new Array(promises.length); //用来装被解决的promise们的解决值。
      let pending = promises.length;

      // edge case: when promises input is [], then should return []
      if (pending === 0) {
        resolve(results);
        return;
      }

      //main logic:
      promises.forEach(async (p, index) => {
        try {
          const data = await p;
          results[index] = data; //根据index对号入座, update results
          pending -= 1;

          //所有Promise对象都被✅了, 那就reslove all✅Promise的解决值们 (数组)
          if (pending === 0) {
            resolve(results);
          }
        } catch (err) {
          //只要有一个Promise对象被❌了,那就reject被❌promise的拒绝值
          reject(err);
        }
      });
    });
  }

  static allSettled(promises) {
    return new Promise((resolve) => {
      const results = new Array(promises.length);
      let pending = promises.length;

      // edge case： when input is empty array
      if (pending === 0) {
        resolve(results);
        return;
      }

      /* main logic */
      promises.forEach(async (p, index) => {
        //不管每个promise是被✅还是❌,都要update result
        try {
          let data = await p;
          results[index] = { status: 'fulfilled', value: data };
        } catch (err) {
          results[index] = { status: 'rejected', reason: err };
        }

        pending--;
        // 所有Promise对象都被处理了, 那就resolve all Promise的解决/拒绝值们 (数组)
        if (pending === 0) {
          resolve(results);
        }
      });
    });
  }

  static any(promises) {
    return new Promise((resolve, reject) => {
      if (promises.length === 0) {
        // edge case: when input is empty
        reject(new AggregateError('No Promise passed'));
      }

      let pending = promises.length;
      const errResult = [];

      promises.forEach(async (p, index) => {
        try {
          const data = await p;
          resolve(data); // 有一个Promise对象被✅，那就resolve第一个✅的Promise 对象的解决值
        } catch (err) {
          errResult[index] = err;
          pending--;

          //所有Promise 对象都被❌了，那就reject一个被❌的Promise对象,并使用一个AggregateError对象来包装所有拒绝的原因)
          if (pending === 0) {
            reject(new AggregateError('none resolved', errResult));
          }
        }
      });
    });
  }

  static race() {
    return new Promise((resolve, reject) => {
      if (promises.length === 0) return; // edge case: when input is empty
      promises.forEach(async (p) => {
        try {
          const data = await p;
          resolve(data); // 有一个Promise对象被✅，那就resolve第一个✅的Promise对象的解决值
        } catch (err) {
          reject(err); // 有一个Promise对象被❌，那就reject第一个❌的Promise对象的拒绝值
        }
      });
    });
  }
}

//https://www.youtube.com/watch?v=1l4wHWQCCIc&t=77s&ab_channel=WebDevSimplified
