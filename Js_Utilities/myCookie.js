/**
  We can get and set cookie by document.cookie.
    document.cookie = 'bfe=dev' // "bfe=dev"
    document.cookie = 'bfe1=dev1' // "bfe1=dev1"
    document.cookie // "bfe=dev; bfe1=dev1"
  
  Please create your own myCookie.
  1. it should support get and set.
        document.myCookie = 'bfe=dev' // "bfe=dev"
        document.myCookie = 'bfe1=dev1' // "bfe1=dev1"
        document.myCookie // "bfe=dev; bfe1=dev1"
  2. there a few options to cookie, but in this problem, you only need to support max-age which means the cookie should be deleted after certain time(in seconds).
        document.myCookie = 'bfe=dev; max-age=1' // "bfe=dev; max-age=1"
        document.myCookie // "bfe=dev"
        after 1 second
        document.myCookie // ""
  
  in your code, please enable myCookie in install() and remove the logic in uninstall(), these are used in judging.
 */
/* -------------------用例测试--------------------*/

/* -------------------------- Code Solution ------------------------------- */
// enable myCookie
function install() {
  const map = new Map();
  /* Map < 
          key: string, 
          entry:{ 
              value: string, 
              maxAge?: number, 
              createdAt: number
          } 
    > */

  Object.defineProperty(document, 'myCookie', {
    get() {
      const result = [];
      for (let [key, entry] of map.entries()) {
        // handle expire
        if (entry.maxAge !== undefined) {
          if (Date.now() - entry.createdAt >= entry.maxAge) {
            map.delete(key);
            continue;
          }
        }
        result.push(`${key}=${entry.value}`);
      }
      return result.join('; ');
    },
    set(valStr) {
      const [keyValuePair, ...options] = valStr.replaceAll(' ', '').split(';');
      const [key, val] = keyValuePair.split('=');
      if (!key || !val) return;

      const entry = {
        value: val,
        createdAt: Date.now(),
        // maxAge property should be set inside below forEach
      };
      options.forEach((option) => {
        const [k, v] = option.split('=');
        if (!k || !v) return;

        if (k === 'max-age') {
          const maxAge = parseInt(v, 10);
          if (Number.isNaN(maxAge)) return;
          entry.maxAge = maxAge * 1000;
        }
      });
      map.set(key, entry);
    },
    configurable: true,
  });
}

// disable myCookie
function uninstall() {
  delete document.myCookie;
}

/**
  Object.defineProperties():
    - 作用：用于定义或修改一个对象的1个或多个属性及其对应的属性discriptor
    - 返回：修改后的对象
    - 用法：有2️⃣个用法：
        1. 如果你只想定义/修改1个属性 这时需要提供第一个参数obj，第二个参数prop，和第三个参数 descriptor：
          const obj2 = {};
          Object.defineProperty(obj2, 'name', {
            value: 'John',
            writable: false,
            enumerable: true
          });
          console.log(obj2); // { name: 'John' }
        2. 如果你想一次性定义/修改多个属性。 这时要提供第一个参数obj 和一个包含属性discriptors的对象作为第二个参数. 不需要提供第三个参数，因为所有的属性描述符都包含在第二个参数的对象中。
          const obj = {};
          Object.defineProperties(obj, {
            name: {
              value: 'John',
              writable: true,
              enumerable: true,
              configurable: true
            },
            age: {
              value: 25,
              writable: false,
              enumerable: true,
              configurable: false
            }
          });
          console.log(obj); // { name: 'John', age: 25 }
 */
