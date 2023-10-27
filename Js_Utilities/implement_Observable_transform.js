/**
  This is a follow-up on implement_Observable.js

  There are [a lot of operators](https://rxjs-dev.firebaseapp.com/guide/operators) for Observable, 
  if we think of Observable as event stream, then modifying the stream is a common task, transformation operators are useful at this.
  In this problem, you are asked to implement [map()](https://rxjs-dev.firebaseapp.com/api/operators/map), as the name indicates, 
  it maps the value to another value thus creating a new event stream.

  Here is an example:
    const source = Observable.from([1,2,3])
    map(x => x * x)(source) // this transformer doubles numbers and create a new stream
    .subscribe(console.log)
      // 1
      // 4
      // 9
    Observable has pipe() method which could make this more readable.
      const source = Observable.from([1,2,3])
      source.pipe(map(x => x * x))
      .subscribe(console.log)
        // 1
        // 4
        // 9

  Note Observable is already given for you, no need to create it.
 */

/* ---------------------------- Solution -------------------------------- */
/**
 * @param {any} input
 * @return {(observable: Observable) => Observable}
 * returns a function which trasnform Observable
 */

/*
	quick overview: 
    map takes transform function and returns function 
    which takes observable as argument and that function returns
    a new Observable where we run subscriber.next with transform function subscriber.next(transform(value))
*/
function map(transform) {
  return (observable) => {
    return new Observable((subscriber) => {
      observable.subscribe((value) => {
        subscriber.next(transform(value));
      });
    });
  };
}
