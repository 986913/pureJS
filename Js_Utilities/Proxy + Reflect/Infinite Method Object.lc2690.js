/* --------------------- 用例测试 ----------------------- */
const obj = createInfiniteObject();
obj['abc123'](); // "abc123"

/* ---------------------------- Solution -------------------------------- */
/**
 * @return {Object}
 */
var createInfiniteObject = function () {
  const obj = {};

  const objProxy = new Proxy(obj, {
    get: function (_, prop) {
      return function () {
        return prop;
      };
    },
  });

  return objProxy;
};
