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

/* -------------------------- Code Solution: -------------------------------- */
/**
 * @param {Object} object
 * @param {string|Array<string>} path
 * @param {*} defaultValue
 * @return {*}
 */

function get(object, path, defaultValue) {
  const paths = Array.isArray(path) ? path : path.split('.');

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
