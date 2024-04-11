/**
  In Immutability Helper， we are asked to implement immutability helpers. These helpers requires extra effort for us to remember how to use them, while [Immer](https://immerjs.github.io/immer/produce) takes another approach which might be easier to use.
  For example, we have a base state as below:
    const state = [
      {
        name: 'BFE',
      },
      {
        name: '.',
      }
    ]
  We can use `produce()` to patch our modification and get a new state:
    const newState = produce(state, draft => {
      draft.push({name: 'dev'})
      draft[0].name = 'bigfrontend'
      draft[1].name = '.' // set with the same value
    })
  Unchanged parts are not cloned.
    expect(newState).not.toBe(state);
    expect(newState).toEqual(
      [
        {
          name: 'bigfrontend',
        },
        {
          name: '.',
        },
        {
          name: 'dev'
        }
      ]
    );
    expect(newState[0]).not.toBe(state[0])
    expect(newState[1]).toBe(state[1])
    expect(newState[2]).not.toBe(state[2])

  **Please implement your produce()**.
    1. This is not to recreate Immer, test cases only cover the basic usage.
    2. You only need to support basic usage on plain object and array, things like Map/Set, Auto freezing .etc are out of scope.
    3. You need to make sure unchanged parts are not cloned.
 */

/* -------------------------- Code Solution: -------------------------------- */
/**
 * @param {any} base
 * @param {(draft: any) => any} recipe
 * @returns {any}
 */
function produce(base, recipe) {
  const copy = JSON.parse(JSON.stringify(base));
  recipe(copy); // modify copy through recipe function

  // if origianl and copy is same, then return original, otherwise return copy
  if (compare(base, copy)) return base;
  return copy;
}

function compare(origin, modified) {
  if (typeof origin !== typeof modified) return false;
  if (typeof origin !== 'object') return origin === modified;

  let isEqual = true;
  for (let key in origin) {
    //当前层origin[key]===modified[key]时
    if (compare(origin[key], modified[key])) {
      modified[key] = origin[key];
    } else {
      isEqual = false;
    }
  }

  return Object.keys(origin).length === Object.keys(modified).length && isEqual;
}
