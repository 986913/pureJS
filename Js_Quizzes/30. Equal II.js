console.log([1] == 1); // 1 == 1 = true
console.log([1] == '1'); // 1 == 1 = true
console.log(['1'] == '1'); // 1 == 1 = true
console.log(['1'] == 1); // 1 == 1 = true
console.log([1] == ['1']); // false as both are arrays (not the same reference)
console.log(new Boolean(true) == 1); // 1 == 1 = true
console.log(new Boolean(true) == new Boolean(true)); // false as both are actually objects
console.log(Boolean(true) == '1'); // true == '1' = 1 == 1 = true
console.log(Boolean(false) == [0]); // false == [0] = 0 == 0 = true
console.log(new Boolean(true) == '1'); // object true == '1' = 1 == 1 = true
console.log(new Boolean(false) == [0]); // object fasle == [0] = // false as both are actually objects
console.log(null == undefined); // true

/**
  Number([1]) // 1
  Number(['0']) // 0
  Number(true) // 1 
  Number(false) // 0
  Boolean(true) // primitive true
  new Boolean(true) // object true
 */
