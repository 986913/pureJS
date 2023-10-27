/**
  This is a follow-up on implement_Observable.js

  Plain Observables are unicast, meaning every subscription is independent. 
  To create multicast, you need to use Subject.

  Following code is easier to understand:
    // default behavior with plain Observable
    const observable = from([1,2,3])
    observable.subscribe(console.log)
    observable.subscribe(console.log)
      // 1
      // 2
      // 3
      // 1
      // 2
      // 3
  You can see that two subscriptions are independent so the logs are grouped by subscription.
  with Subject, it works like Event Listeners in DOM world.
    const subject = new Subject()
    subject.subscribe(console.log)
    subject.subscribe(console.log)
    const observable = from([1, 2, 3])
    observable.subscribe(subject)
      // 1
      // 1
      // 2
      // 2
      // 3
      // 3
  
  Now the logs are different! That is because Subject first works as a observer, get the values, then works as an Observable and dispatch the value to different observers.
  Cool right? Ok, you are asked to implement a simple Subject Class.
    Observable is given for you, you can just use it.
    you can use new Observer({next,error,complete}) or new Observer(function) to create an observer.
 */

/* --------------------- 用例测试 ----------------------- */
const subject = new Subject();
subject.subscribe(console.log);
subject.subscribe(console.log);
const observable = from([1, 2, 3]);
observable.subscribe(subject);
// 1
// 1
// 2
// 2
// 3
// 3

/* ---------------------------- Solution -------------------------------- */
// You can use Observer which is bundled to your code
/*
  class Observer {
    // subscriber could one next function or a handler object {next, error, complete}
    constructor(subscriber) { }
    next(value) { }
    error(error) { }
    complete() {}
  }
*/

class Subject {
  constructor() {
    this.subscribers = [];
  }
  subscribe(subscriber) {
    const sub = new Observer(subscriber);
    this.subscribers.push(sub);
    return {
      unsubscribe: () => {
        this.subscribers = this.subscribers.filter((s) => s !== sub);
      },
    };
  }
  next = (value) => {
    this.subscribers.forEach((subscriber) => {
      subscriber.next(value);
    });
  };
  error = (err) => {
    this.subscribers.forEach((subscriber) => {
      subscriber.error(err);
    });
  };
  complete = () => {
    this.subscribers.forEach((subscriber) => {
      subscriber.complete();
    });
  };
}
