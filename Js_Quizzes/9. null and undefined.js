// This is a JavaScript Quiz from BFE.dev

console.log(JSON.stringify([1, 2, null, 3])); // "[1,2,null,3]"
console.log(JSON.stringify([1, 2, undefined, 3])); // "[1,2,null,3]"  --->  JSON doesn't have undefined value, it's replaced with null in JSON data type.
console.log(null === undefined); //false:   null -> 0 and undefined -> NaN, then NOT strictly equal
console.log(null == undefined); // true:    Special rule, Just Remember it
console.log(null == 0); // false:           Special rule: null is not converted to 0 here
console.log(null < 0); // false:            null -> 0
console.log(null > 0); // false:            null -> 0
console.log(null <= 0); // true:            null -> 0
console.log(null >= 0); // true:            null -> 0
console.log(undefined == 0); // false:      undefined -> NaN
console.log(undefined < 0); // false:       undefined -> NaN
console.log(undefined > 0); // false:       undefined -> NaN
console.log(undefined <= 0); // false:      undefined -> NaN
console.log(undefined >= 0); // false:      undefined -> NaN
