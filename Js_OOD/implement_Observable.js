/**
  Have you ever used RxJS before? The most important concept in it is: Observable and Observer.
  Observable defines how values are delivered to Observer. 
  Observer is just a set of callbacks.

  Let's look at the code:
    const observer = {
      next: (value) => {
        console.log('we got a value', value)
      },
      error: (error) => {
        console.log('we got an error', error)
      },
      complete: () => {
        console.log('ok, no more values')
      }
    }
  
  Above is an Observer which is pretty clear about what it is doing.
  Then we could attach this Observer to some Observable. Observable feeds this observer with values or errors.
    const observable = new Observable((subscriber)=> {
      subscriber.next(1)
      subscriber.next(2)
      setTimeout(() => {
        subscriber.next(3)
        subscriber.next(4)
        subscriber.complete()
      }, 100)
    })

  The code plainly says when is a subscriber is attached:
    1. subscriber is fed with a value 1
    2. subscriber is then fed with a value 2
    3. wait 100 ms
    4. subscriber is fed with 3
    5. subscriber is fed with 4
    6. no more values for subscriber

  Now if we attach above observer to observable, next and complete of subscriber are called in order.(be aware that there is a delay between 2 and 3)
    const sub = observable.subscribe(subscriber)
    // we got a value 1
    // we got a value 2

    // we got a value 3
    // we got a value 4
    // ok, no more values


  So this is the basic idea of Observable and Observer. There will be a few more interesting follow-up problems.
  Now you are asked to implement a basic Observable class, which makes above possible.
  Some extra requirements are listed here:
    1. error and complete can only be delivered once, next/error/complete after error/complete should not work
    2. for a subscriber object, next/error/complete callback are all optional. if a function is passed as observer, it is treated as next.
    3. should support multiple subscription

  Further Reading: https://github.com/tc39/proposal-observable
 */
/* --------------------- 用例测试 ----------------------- */
const observer = {
  next: (value) => console.log('we got a value', value),
  error: (error) => console.log('we got an error', error),
  complete: () => console.log('ok, no more values'),
};

const observable = new Observable((subscriber) => {
  subscriber.next(1);
  subscriber.next(2);
  setTimeout(() => {
    subscriber.next(3);
    subscriber.next(4);
    subscriber.complete();
  }, 100);
});
const sub = observable.subscribe(observer);
/*
  then console.log(sub)输出结果是：
    we got a value 1
    we got a value 2

    we got a value 3
    we got a value 4
    ok, no more values
 */

/* ---------------------------- Solution -------------------------------- */
class Subscriber {
  constructor(subscriber) {
    if (typeof subscriber === 'function') {
      this.subscriber = { next: subscriber };
    } else {
      this.subscriber = subscriber;
    }

    this.isUnsubscribed = false;
  }

  next(value) {
    if (this.isUnsubscribed) return;
    if (this.subscriber.next) {
      try {
        this.subscriber.next(value);
      } catch (err) {
        this.error(err);
      }
    }
  }

  error(err) {
    if (this.isUnsubscribed) return;
    if (this.subscriber.error) {
      this.subscriber.error(err);
    }
    this.unsubscribe();
  }

  complete() {
    if (this.isUnsubscribed) return;
    if (this.subscriber.complete) {
      this.subscriber.complete();
    }
    this.unsubscribe();
  }

  unsubscribe() {
    this.isUnsubscribed = true;
  }
}

class Observable {
  constructor(setup) {
    this.setup = setup;
  }

  subscribe(subscriber) {
    const sub = new Subscriber(subscriber);
    this.setup(sub);
    return {
      unsubscribe() {
        sub.unsubscribe();
      },
    };
  }
}
