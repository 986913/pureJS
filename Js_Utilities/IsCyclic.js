/*-------------------- 用例测试 -------------------------*/
const foo = {};
foo.a = foo;
isCyclic(foo); // true

const myname = 'ming';
isCyclic(myname); //false

const obj = { a: 1, b: 2 };
isCyclic(obj); // false

/* -------------------------- Code Solution -------------------------------- */
const isCyclic = (input) => {
  const seen = new Set(); // 来记录已经访问过的对象，以便检测是否存在循环引用。

  const helper = (obj) => {
    if (typeof obj !== 'object' || obj === null) {
      return false;
    }

    seen.add(obj);
    return Object.values(obj).some((value) => seen.has(value) || helper(value));
  };

  return helper(input);
};
