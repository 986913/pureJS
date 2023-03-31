/* --------------------- 用例测试: 实现这种函数 ----------------------- */
classNames('foo', 'bar'); // 'foo bar'
classNames('button', isLiked && 'liked'); // 'button liked' (if isLiked is truty)
classNames('foo', { bar: true }); // 'foo bar'
classNames({ 'foo-bar': true }); // 'foo-bar'
classNames({ 'foo-bar': false }); // ''
classNames({ foo: true }, { bar: true }); // 'foo bar'
classNames({ foo: true, bar: true }); // 'foo bar'
classNames({ foo: true, bar: false, qux: true }); // 'foo qux'
classNames('a', ['b', { c: true, d: false }]); // 'a b c'
classNames(
  'foo',
  {
    bar: true,
    duck: false,
  },
  'baz',
  { quux: true }
); // 'foo bar baz quux'
classNames(null, false, 'bar', undefined, 0, 1, { baz: null }, ''); // 'bar 1'

/* --------------------- Code solution ---------------------------- */
/**
 * @param {...(string|Object|Array<string|Object>)} args
 * @return {string}
 */

function classNames(...args) {
  let results = [];

  args.forEach((arg) => {
    // ignore falsey values.
    if (!arg) return;

    const argType = typeof arg;

    // handle string and numbers:
    if (argType === 'string' || argType === 'number') {
      results.push(arg);
      return;
    }

    // handle arrays: Invoke the classNames function recursively
    if (Array.isArray(arg)) {
      results.push(classNames(...arg)); // recursion here;
      return;
    }

    // handle objects: Loop through the key/value pairs and add the keys with truthy values into the results collection
    if (argType === 'object') {
      for (const key in arg) {
        if (arg[key] && arg.hasOwnProperty(key)) {
          results.push(key);
        }
      }
      return;
    }
  });

  return results.join(' ');
}

/**
 * 知识点：typeof [] gives 'object', so you need to handle arrays before objects.
 */
