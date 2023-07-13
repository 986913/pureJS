/* 
  Lodash _.set documentation:  https://lodash.com/docs/4.17.15#set
  _.set(object, path, value) is a handy method to updating an object without checking the property existence.
  Can you create your own set()?
*/

/* ------------------- 用例测试 --------------------*/
const obj = {
  a: {
    b: {
      c: [1, 2, 3],
    },
  },
};

set(obj, 'a.b.c', 'BFE');
console.log(obj.a.b.c); // "BFE"

set(obj, 'a.b.c.0', 'BFE');
console.log(obj); // {a:{b:{c:["BFE",2,3]}}}
console.log(obj.a.b.c[0]); // "BFE"

set(obj, 'a.b.c[1]', 'BFE');
console.log(obj); // {a:{b:{c:[1,"BFE",3]}}}
console.log(obj.a.b.c[1]); // "BFE"

set(obj, ['a', 'b', 'c', '2'], 'BFE');
console.log(obj); // {a:{b:{c:[1,2,"BFE"]}}}
console.log(obj.a.b.c[2]); // "BFE"

set(obj, 'a.b.c[3]', 'BFE');
console.log(obj); //  {a:{b:{c:[1,2,3,"BFE"]}}}
console.log(obj.a.b.c[3]); // "BFE"

set(obj, 'a.c.d[0]', 'BFE'); // valid digits treated as array elements
console.log(obj.a.c.d[0]); // "BFE"

set(obj, 'a.c.d.01', 'BFE'); // invalid digits treated as property string
console.log(obj.a.c.d['01']); // "BFE"

/* -------------------------- Code Solution: Lodash Get 🟡 变形题 -------------------------------- */
function set(object, path, value) {
  const paths = Array.isArray(path)
    ? path
    : path.replace('[', '.').replace(']', '').split('.');

  let obj = object;

  paths.forEach((key, index, array) => {
    // if found path( at the end ), then set value for it
    if (index == paths.length - 1) {
      obj[key] = value;
    } else {
      /**
       * if the key doesn't exist on object
       * 例子1： 以path=a.c.d[0]为例,  此处next为'd',下面obj[key]为{}; 再然后next为'0',  obj[key]为[]
       * 例子2： 以path=a.c.d.01为例,  此处next为'd',下面obj[key]为{}; 再然后next为'01'，obj[key]为{}
       */
      if (!obj.hasOwnProperty(key)) {
        const next = array[index + 1];
        obj[key] = String(+next) === next ? [] : {}; // create {} when next is string, create [] when next is number
      }

      obj = obj[key]; // update obj
    }
  });
}
