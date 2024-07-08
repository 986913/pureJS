/**
  Implement a function objectMap(obj, fn) to return a new object containing the results of calling a provided function on every value in the object. 
  The function fn is called with a single argument, the value that is being mapped/transformed.
 */

/* --------------------- 用例测试 1 ----------------------- */
const double = (x) => x * 2;
objectMap({ foo: 1, bar: 2 }, double); // { foo: 2, bar: 4}
/* --------------------- 用例测试 2 ----------------------- */
objectMap({ bar: 3, foo: 2 }, function (this, x) { // Accessing this within the callback function.
return this.foo * x });  // {foo: 4}


/* ---------------------------- Solution 1-------------------------------- */
/**
 * @param {Object} obj
 * @param {Function} fn
 * @returns Object
 */
function objectMap(obj, fn) {
  const result = {}

  for(let key in obj){
    if(Object.prototype.hasOwnProperty.call(obj, key)){ // this check is optional, 保证Key不是原型上的
      result[key] = fn.call(obj, obj[key]) // provide the value of this for the fn via Function.prototype.call()/Function.prototype.apply()
    }
  }
  
  return result;
}
/* ---------------------------- Solution 2: Using  Object.fromEntries -------------------------------- */
function objectMap(obj, fn) {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [key, fn.call(obj, value)]),
  );
}

/***
  知识点： 
    Object.entries({foo:'bar', baz:42} )              --->  [ ['foo', 'bar'], ['baz', 42] ]
    Object.fromEntries ( [['foo','bar'],['baz',42]] ) --->  {foo:'bar', baz:42}

    ------------------------------------ Examples --------------------------------------------
    const map = new Map()
    map.set('ming', 1)

    Object.entries(map)                   // [],                    因为Object.entries()不能作用于Map实例
    [...map.entries()]                    // 转化为数组[["ming", 1]], Map实例要使用.entries(), 注意返回的是generator!
    Object.entries({'ming': 1})           // 转化为数组[["ming", 1]], 因为Object.entries()作用于普通object

    Object.fromEntries(map);              //转为普通object: { ming: 1}, 因为Object.fromEntries()也能作用于Map实例！
    Object.fromEntries([['ming', 1]]);    //转为普通object: { ming: 1}, 因为Object.fromEntries()能作用于数组

 */
