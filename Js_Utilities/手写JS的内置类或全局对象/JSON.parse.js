/**
  Implement your own JSON.parse() function that converts a JSON string into JavaScript value
  JSON.parse() support a second parameter reviver, you can ignore that.
*/

/* -------------------用例测试--------------------*/
parse('{}'); // {}
parse('{"a": 3}'); // {a: 3}
parse('true'); // true
parse('false'); // false
parse('123'); //123
parse('"123"'); //"123"
parse('null'); //null
parse('[{"a":{"b":{"c":[1]}}},null,"str"]'); // [{a:{b:{c:[1]}}},null,"str"]
parse('{"a":"🟡"}'); // {a:"🟡"}
parse('[1,2,]');//  Expected function to throw an exception.
parse('{'a':3}'); //  Expected function to throw an exception.
parse('{"a":}') //  Expected function to throw an exception.


/* -------------------------- Code Solution -------------------------------- */
/**
 * @param {string} str
 * @return {object | Array | string | number | boolean | null}
 */
function parse(str) {
  // JSON.parse() doesn't allow single quote and invalid JSON
  if (str === '' || str[0] === "'") throw new Error();
  if (str === 'null') return null;
  if (str === '{}') return {};
  if (str === '[]') return [];
  if (str === 'true') return true;
  if (str === 'false') return false;
  // to filter only numbers, if it's not number and gets converted to NaN then, NaN === NaN evaluates to false
  if (+str === +str) return Number(str);
  // Get rid of leading and trailing " from string: starting at index 1 (the second character) and ending at index -1 (excluding the last character).
  if (str[0] === '"') return str.slice(1, -1);  
  if (str[0] === '{') {
    return str.slice(1, -1).split(',').reduce((acc, item) => {
      const index = item.indexOf(':');
      const key = item.slice(0, index)
      const value = item.slice(index + 1);
      acc[parse(key)] = parse(value);
      return acc;
    }, {});
  }
  if (str[0] === '[') {
    return str.slice(1, -1).split(',').map((value) => parse(value));
  }
}


/**
 * 知识点：
 * 1. JSON.parse不能运行''
 * 2. unary plus operator can be used for converting type:
 *      console.log(+"42")    // 42
 *      console.log(+"3.14")  // 3.14 
 *      console.log(+"hello") // NaN
 *      console.log(+"'42'")  // NaN
 *      console.log(+ "123" === + "123");  true
 *      console.log(+ "Hello" === + "Hello");  false
 */