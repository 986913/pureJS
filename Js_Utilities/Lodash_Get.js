// Lodash _.get documentation:  https://lodash.com/docs/4.17.15#get
/* -------------------用例测试1--------------------*/
const john = {
  profile: {
    name: { firstName: 'John', lastName: 'Doe' },
    age: 20,
    gender: 'Male',
  },
};
const jane = {
  profile: {
    age: 19,
    gender: 'Female',
  },
};
get(john, 'profile.name.firstName'); // 'John'
get(john, 'profile.gender'); // 'Male'
get(jane, 'profile.name.firstName'); // undefined
get(jane, 'profile.name.firstName', 'Ming'); // Ming
/* -------------------用例测试2--------------------*/
var object = { a: [{ b: { c: 3 } }] };
get(object, 'a[0].b.c'); // 3
get(object, ['a', '0', 'b', 'c']); // 3
get(object, 'a.b.c', 'default'); // 'default'
/* -------------------用例测试3--------------------*/
const obj = {
  a: {
    b: {
      c: [1, 2, 3],
    },
  },
};

get(obj, 'a.b.c'); // [1,2,3]
get(obj, 'a.b.c.0'); // 1
get(obj, 'a.b.c[0]'); // 1
get(obj, 'a.b.c[1]'); // 2
get(obj, ['a', 'b', 'c', '2']); // 3
get(obj, 'a.b.c[3]'); // undefined
get(obj, 'a.c', 'bfe'); // 'bfe'

/* -------------------------- Code Solution: -------------------------------- */
/**
 * @param {Object} object
 * @param {string|Array<string>} path
 * @param {*} defaultValue
 * @return {*}
 */

function get(object, path, defaultValue) {
  const paths = Array.isArray(path)
    ? path
    : path.replaceAll('[', '.').replaceAll(']', '').split('.');
  // path.replaceAll('[','.').replaceAll(']','')是为了这个case: get(obj, 'a.b.c[0]')得到1而不是undefined

  let index = 0;
  let len = paths.length;
  let obj = object;

  while (obj != null && index < len) {
    obj = obj[String(paths[index])];
    index++;
  }

  const value = index && index === len ? obj : undefined;

  return value !== undefined ? value : defaultValue;
}
