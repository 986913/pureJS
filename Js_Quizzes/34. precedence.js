let a = 1;
console.log(a++ + a); // 3
// (a++  + a) = 1 + 2 = 3 (Note that a after + gets incremented)

let b = 1;
console.log(b + +(+b)); // 2
// (1 + +(+1)) = (1 + +1) = 1 + 1 = 2

let c = 1;
console.log(c-- - c); // 1
// (c--  - c) = 1 - 0 = 1 (Note that c after - gets decremented)

let d = 1;
console.log(d - -(-d)); // 0
// (1 - -(-1)) = (1 - 1) = 0
