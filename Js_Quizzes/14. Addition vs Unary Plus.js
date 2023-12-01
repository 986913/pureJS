// This is a JavaScript Quiz from BFE.dev

console.log(1 + 2); // 3
console.log(1 + +2); // 1 + (+2) = 1 + 2 = 3
console.log(1 + +(+2)); // 1 + (+(+2)) = 1 + 2 = 3
console.log(1 + '2'); // "1" + "2" = "12"
console.log(1 + +'2'); // 1 + (+2) = 1 + 2 = 3
console.log('1' + 2); // "1" + "2" = "12"
console.log('1' + +2); // "1" + (+2) = "1" + 2 = "1" + "2" = "12"
console.log(1 + true); // 1 + 1 = 2
console.log(1 + +true); // 1 + (+true) = 1 + 1 = 2
console.log('1' + true); // "1" + "true" = "1true"
console.log('1' + +true); // "1" + (+true) = "1" + 1 = "1" + "1" = "11"
console.log(1 + null); // 1 + 0 = 1
console.log(1 + +null); // 1 + (+null) = 1 + 0 = 1
console.log('1' + null); // "1" + "null" = "1null"
console.log('1' + +null); // "1" + (+null) = "1" + 0 = "1" + "0" = "10"
console.log(1 + undefined); // 1 + NaN = NaN
console.log(1 + +undefined); // 1 + (+undefined) = 1 + NaN = NaN
console.log('1' + undefined); // "1" + "undefined" = "1undefined"
console.log('1' + +undefined); // "1" + (+undefined) = "1" + NaN = "1" + "NaN" = "1NaN"
console.log('1' + +(+undefined)); // "1" +(+(+undefined)) = "1" + NaN = "1" + "NaN" = "1NaN"

/**
  +1     // 1
  +"1"   // 1
  +true  // 1
  +null  // 0
  +undefined // NaN
  +NaN   // NaN
 */
