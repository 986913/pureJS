console.log(1 + 1); // 2
console.log(1 + +1); // 1 + (+1) = 1 + 1 = 2
console.log(1 + +1 + 1); // 1 + (+1) + 1 = 1 + 1 + 1 = 3
console.log(1 + +1 + +1); // 1 + (+1) + (+1) =  1 + 1 + 1 = 3
console.log(1 + +(+1)); // 1 + (+(+1)) = 1 + (+1) = 1 + 1 = 2

console.log(1 + +'1' + +'1'); // 1 + (+'1') + (+'1') = 1 + 1 + 1 = 3
console.log('1' + +'1' + +'1'); // "1" + (+'1') + (+'1') = "1" + 1 + 1 = "1" + "1" + "1" = "111"
console.log('a' + +'b'); // "a" + (+'b') = a + "NaN" = "aNaN"
console.log('a' + +'b' + 'c'); // "a" + (+'b') +'c' = a + "NaN"  + "c" = "aNaNc"
console.log('a' + +'b' + +'c'); // "a" + (+'b') + (+'c') = a + "NaN"  + "NaN" = "aNaNNaN"
