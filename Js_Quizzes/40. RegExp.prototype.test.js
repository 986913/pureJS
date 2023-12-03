console.log(/^4\d\d$/.test('404')); // true
console.log(/^4\d\d$/.test(404)); // true
console.log(/^4\d\d$/.test(['404'])); // true
console.log(/^4\d\d$/.test([404])); // true

/**

  The test() method expects a string as input, against which to match the regular expression.
  So, if the input is not a string it simply converts the input to a string and then matches with regex.

  ^4\d\d$ 👉🏻 Starts with 4 followed by exactly one digit and ending with another digit

  "404" // true
  404.toString() // "404" true
  ["404"].toString() // "404" true
  [404].toString() // "404" true
 */
