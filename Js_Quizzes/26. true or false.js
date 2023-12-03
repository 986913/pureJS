// Number([]) // 0
// Number(false) // 0

console.log([] == 0); // 0 == 0 is true
console.log([] == false); // 0 == 0 is true
console.log(!![]); // !(![]) = !(!true) = !(false) = true
console.log([1] == 1); // 1 == 1 = true
console.log(!![1]); // !(![1]) = !(false) = true
console.log(Boolean([])); // true

// new Boolean([]) returns an object
// new Boolean(false) This also returns an object
// Boolean(any object) will be true

console.log(Boolean(new Boolean([]))); // Boolean(some object) is true
console.log(Boolean(new Boolean(false))); // Boolean(some object) is true
