// This is a JavaScript Quiz from BFE.dev

const obj = new Map();
const map = new Map();
obj.foo = 1;
map.set('foo', 2);
console.log(obj.foo); // 1
console.log(map.get('foo')); // 2

const proxyObj = new Proxy(obj, {});
const proxyMap = new Proxy(map, {});
console.log(proxyObj.foo); // 1
console.log(proxyMap.get('foo')); // Error

/**
  The Proxy object allows you to create an object that can be used in place of the original object, 
  but which may redefine fundamental Object operations like getting, setting, and defining properties.

  If a handler has not been defined, the default behavior is to forward the operation to the target, 
  however that only applies to standard behaviors like property access, and not the internal slots of exotic objects.

  ⚠️ Details are pretty technical 🤯
  If the target does not have a [[MapData]] internal slot, throw a TypeError exception.
  Similar behavior in ES6 Set is explained at https://stackoverflow.com/questions/43927933/why-is-set-incompatible-with-proxy
 */
