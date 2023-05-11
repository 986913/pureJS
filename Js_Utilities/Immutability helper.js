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
const isObject = (val) =>
  Object.prototype.toString.call(val) === '[object Object]';

function update(data, command) {
  /* for simple cases, which $command is in the first layer */
  if ('$push' in command) {
    if (!Array.isArray(data)) throw new Error('data is not an array');
    return [...data, ...command['$push']];
  }
  if ('$merge' in command) {
    if (!isObject(data)) throw new Error('data is not an object');
    return {
      ...data,
      ...command['$merge'],
    };
  }
  if ('$apply' in command) return command['$apply'](data);
  if ('$set' in command) return command['$set'];

  /* for cases with path:  recursion here */
  const copiedData = Array.isArray(data) ? [...data] : { ...data };
  // 注意； for...of循环数组时, 出来的直接就是数组中的每个项的值啦
  for (const key of Object.keys(command)) {
    copiedData[key] = update(copiedData[key], command[key]);
  }

  return copiedData;
}

//-------小知识点------------------------------------------------------
/**
  const obj = { a: { b: { c: { $set: 3 } } } };
  for (const key of Object.keys(obj)) {
    console.log(key);
  }
  出来结果只有"a".
  如果你想打印深层次的b,c键. 那就得recursion了：
    function printDeepKeys(obj, prefix = '') {
      for (const key of Object.keys(obj)) {
        const fullPath = prefix ? `${prefix}.${key}` : key;
        console.log(fullPath);

        if (typeof obj[key] === 'object') {
          printDeepKeys(obj[key], fullPath);
        }
      }
    }

    printDeepKeys(obj);
      //a
      //a.b
      //a.b.c
 */
