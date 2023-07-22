/**
  Give a number string, check if it is valid number.
  By "valid", we mean if it validates as one of below formats:
    integer, such as '0', '-1'
    decimal number like '1.0', '-2.335'
    exponential notation -12.3e45
  Formats such as BigInt, Infinity, NaN, octal and hexadecimal .etc are out of scope, you can treat them as invalid.
  Pay attention to the sign + -.

  Note: 
    The test cases are not covering all the possible cases, since this is not a problem to test your knowledge against JavaScript language spec.
    You should confirm with your interviewer about the scope and those edge cases.
    isNaN() seems to be a nice trick, but could you solve without it?
 */

/* -------------------用例测试--------------------*/
validateNumberString('0'); // true
validateNumberString('+0'); // true
validateNumberString('0+'); // false
validateNumberString('+'); // false
validateNumberString('+.0'); // true
validateNumberString('.'); // false
validateNumberString('-0'); // true
validateNumberString('-199990'); // true
validateNumberString('-199-99'); // false
validateNumberString('+1999-'); // false
validateNumberString('123'); // true
validateNumberString('-555.555'); // true
validateNumberString('-555.+555'); // false
validateNumberString('++1'); // false
validateNumberString('bfe'); // false
validateNumberString('.3'); // true
validateNumberString('100.'); // true
validateNumberString('100..'); // false
validateNumberString('+100.'); // true
validateNumberString('-100.'); // true
validateNumberString('+100.-1'); // false
validateNumberString('+100.123444444444'); // true
validateNumberString('+100.123444444444e'); // false
validateNumberString('-.3'); // true
validateNumberString('-..3'); // false
validateNumberString('e3'); // false
validateNumberString('e'); // false
validateNumberString('0e1'); // true
validateNumberString('0e.'); // false
validateNumberString('0.e'); // false
validateNumberString('10000e10000100001000010000'); // true
validateNumberString('**'); // false
validateNumberString(''); // false

/* -------------------------- Code Solution1 :  use isNaN() -------------------------------- */
const validateNumberString = (str) => str !== '' && !isNaN(str);

/* -------------------------- Code Solution2 :  use parseFloat() --------------------------- */
const validateNumberString = (str) => parseFloat(str) == str;

/* -------------------------- Code Solution3 :  use +str trick ----------------------------- */
const validateNumberString = (str) => !!str && +str == str;

/* -------------------------- Code Solution4 :  use Regular expression --------------------- */
const validateNumberString = (s) =>
  /^[+-]?(([1-9]\d+|[0-9])(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i.test(s);
