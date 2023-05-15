/**

This problem is related to [async helper - Parallel]
You are asked to implement an async function helper, `race()` which works like [Promise.race()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race). 
Different from `parallel()` that waits for all functions to finish, `race()` will finish when any function is done or run into error.

All async functions have following interface
  type Callback = (error: Error, data: any) => void
  type AsyncFunc = (
    callback: Callback,
    data: any
  ) => void


Your `race()` should accept AsyncFunc array**, and return a new function which triggers its own callback when **any** async function is done or an error occurs.

Suppose we have an 3 async functions
  const async1 = (callback) => {
    setTimeout(() => callback(undefined, 1), 300)
  }
  const async2 = (callback) => {
      setTimeout(() => callback(undefined, 2), 100)
  }
  const async3 = (callback) => {
    setTimeout(() => callback(undefined, 3), 200)
  }


Your `race()` should be able to accomplish this
  const first = race(
    [
      async1,
      async2,
      async3
    ]
  )
  first((error, data) => {
    console.log(data) // 2, since 2 is the first to be given. 注意：返回的data不再像parallel返回数组了....
  }, 1)
  
When error occurs, only first error is passed down to the last. Later errors or data are ignored.
 */
