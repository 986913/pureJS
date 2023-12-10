// both primitives remain as it is
console.log(JSON.stringify(['false', false])); // "["false",false]"

// in an array these values are converted to null
console.log(JSON.stringify([NaN, null, Infinity, undefined])); // "[null,null,null,null]"

// in an object, undefined keys are omitted, while NaN gets converted to null
console.log(JSON.stringify({ a: null, b: NaN, c: undefined })); // "{"a":null,"b":null}"

/***

### 知识点：

1.  当给 **`JSON.stringify()`**传入 unsupported type, 例如 `undefined`, `Symbol`, and `Function`会输出`undefined`(not the string `'undefined'`)
    JSON.stringify(undefined);     // undefined
    JSON.stringify(Symbol('foo')); // undefined
    JSON.stringify(() => {});      // undefined
    
2. For other built-in object types (except for `Function`and `Date`) such as `Map`, `Set`, `WeakMap`, `WeakSet`, `Regex`, etc., `JSON.stringify`will return a string of an empty object literal, i.e. `{}`
    JSON.stringify(/foo/); // '{}'
    JSON.stringify(new Map()); // '{}'
    JSON.stringify(new Set()); //'{}'
    
3. `NaN`and `Infinity`are converted into `null`, and `Date`objects are encoded into ISO strings by `JSON.stringify`because of `Date.prototype.toJSON`. And yes, we will have to take care of a custom `toJSON`method present in the input value.
4. `JSON.stringify`can detect a cyclic object i.e. objects with circular references and bail out from the stringification by throwing an error. We will have to account for that as well.
      const foo = {};
      foo.a = foo;
      JSON.stringify(foo); // ❌ Uncaught TypeError: Converting circular structure to JSON
 */
