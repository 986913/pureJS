/* --------------------- 用例测试: 实现这种函数 ----------------------- */
add(2)(3)(4); //9
add(2, 3, 4); //9

/* ---------------------- Code solution --------------------------- */
const add = (...args) => {
  //针对于add(2)(3)(4)
  if (args.length === 1) {
    return (b) => {
      return (c) => {
        return args[0] + b + c;
      };
    };
  }

  //针对于add(2, 3, 4)
  return Array.from(args).reduce((acc, cur) => acc + cur);
};
