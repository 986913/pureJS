// Lodash _.once documentation:  https://lodash.com/docs/4.17.15#partial

/* -------------------用例测试 1--------------------*/
const func = (...args) => args;
const func123 = partial(func, 1, 2, 3);
func123(4); // [1,2,3,4]
/* -------------------用例测试 2--------------------*/
const _ = partial.placeholder;
const func1_3 = partial(func, 1, _, 3);
func1_3(2, 4); // [1,2,3,4]

/* -------------------------- Code Solution: -------------------------------- */
