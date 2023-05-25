// This is a JavaScript Quiz from BFE.dev

console.log(0 == false); // 0 == 0 -> true
console.log('' == false); // 0 == 0 -> true
console.log([] == false); // 0 == 0 -> true
console.log(undefined == false); // NaN == 0 -> false
console.log(null == false); // 0 == 0 -> false 🤯
console.log('1' == true); // 1 == 1 -> true
console.log(1n == true); // 1 == 1 -> true
console.log(' 1     ' == true); // 1 == 1 -> true

/**
  知识点：
    Number(false) // 0
    Number("") // 0
    Number([]) // 0
    Number(undefined) // NaN
    Number(null) // 0

    Number(true) // 1
    Number('1') // 1
    Number(1n) // 1
    Number('   1  ') // 1
 */
