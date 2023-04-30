/**
 * This is a follow-up on CurryI
 * please implement curry() which also supports placeholder.
 **/

/* --------------------- 用例测试1 ----------------------- */
const join = (a, b, c) => `${a}_${b}_${c}`;

const curriedJoin = curry(join);
const _ = curry.placeholder;

curriedJoin(1, 2, 3); // '1_2_3'
curriedJoin(_, 2)(1, 3); // '1_2_3'
curriedJoin(_, _, _)(1)(_, 3)(2); // '1_2_3'

/* -------------------------------- Code solution ---------------------------------- */
/**
 * @param { (...args: any[]) => any } func
 * @returns { (...args: any[]) => any }
 */

function curry(func) {
  return function curried(...args) {
    //1. if enough args(need to filter out the placeholder), call func
    const expectedArgsLen = func.length;
    const isArgsEnough =
      args.length >= expectedArgsLen &&
      args.slice(0, expectedArgsLen).every((arg) => arg !== curry.placeholder);

    if (isArgsEnough) {
      return func.apply(this, args);
    } else {
      //2. if not enough args, bind the args and wait for new one
      /* for example:  (_,_,_,1,2)(3,_)  we want it become to :  3,_,_,1,2, 而不是_,_,_,1,2,3,_ */
      return function (...args2) {
        //双指针 merge two args: args and args2
        const mergedArgs = [];
        let i = 0; // i is for args
        let j = 0; // j is for args2
        while (i < args.length && j < args2.length) {
          if (args[i] === curry.placeholder) {
            mergedArgs.push(args2[j]);
            i++;
            j++;
          } else {
            mergedArgs.push(args[i]);
            i++;
          }
        }
        //leftovers
        while (i < args.length) {
          mergedArgs.push(args[i]);
          i++;
        }
        while (j < args2.length) {
          mergedArgs.push(args2[j]);
          j++;
        }

        return curried(...mergedArgs);
      };
    }
  };
}
curry.placeholder = Symbol();
