/**
If you use React, you would meet the scenario to copy the state for a slight change.
For example, for following state:
  const state = {
    a: {
      b: {
        c: 1
      }
    },
    d: 2
  }
if we are to modify d to a new state, we could use _.cloneDeep, but it is not efficient because state.a is cloned while we don't need to change that.
A better way is to do shallow copy like this:
  const newState = {
    ...state,
    d: 3
  }
now is the problem, if we want to modify c, we would have to do something like
  const newState = {
    ...state,
    a: {
      ...state.a,
      b: {
        ...state.b,
        c: 2
      }
    }
  }

We can see that for simple data structure it would be enough to use spread operator, but for complex data structures, it is verbose.
Here comes the Immutability Helper, you are asked to implement your own Immutability Helper update(), which supports following features.
  1. {$push: array} push() all the items in array on the target.
  2. {$set: any} replace the target
  3. {$merge: object} merge object to the location
  4. {$apply: function} custom replacer

ref link: https://bigfrontend.dev/problem/implement-Immutability-helper
 */

/* -------------------用例测试1--------------------*/
const arr = [1, 2, 3, 4];
const newArr = update(arr, { $push: [5, 6] }); // [1, 2, 3, 4, 5, 6]
/* -------------------用例测试2--------------------*/
const state = {
  a: {
    b: {
      c: 1,
    },
  },
  d: 2,
};
const newState = update(state, { a: { b: { c: { $set: 3 } } } });
/*
newState looks:
  {
    a: {
      b: {
        c: 3
      }
    },
    d: 2
  }
*/
/* -------------------用例测试3--------------------*/
update([1, 2, 3, 4], { 0: { $set: 0 } }); //  [0, 2, 3, 4]
/* -------------------用例测试4--------------------*/
const newState2 = update(state, { a: { b: { $merge: { e: 5 } } } });
/*
newState2 looks:
  {
    a: {
      b: {
        c: 1,
        e: 5
      }
    },
    d: 2
  }
*/
/* -------------------用例测试5--------------------*/
update([1, 2, 3, 4], { 0: { $apply: (item) => item * 2 } }); // [2, 2, 3, 4]

/*****************************************************************************************************************/

/* -------------------------- Code Solution -------------------------------- */
/**
 * @param {any} data
 * @param {Object} command
 */
function update(data, command) {
  // your code here
}
