console.log([] + {}); // "" + "[object Object]" = "[object Object]"

console.log(+{}); // NaN

console.log(+[]); // 0

console.log({} + []); // "[object Object]" + "" = "[object Object]"

console.log({} + []); // "[object Object]" + "" = "[object Object]"

console.log({} + []); // "[object Object]" + "" = "[object Object]"

console.log({} + []); // "[object Object]" + "" = "[object Object]"

console.log({} + +[]); // "[object Object]" + "0" = "[object Object]0"
// think of it as console.log({} + (+[]))
// unary operator performs first which means it is now console.log({} + 0)

console.log({} + +[] + {}); //  "[object Object]" + "0" + "[object Object]" = "[object Object]0[object Object]"
// think of it as console.log({} + (+[]) + {})
// unary operator performs first which means it is now console.log({} + 0 + {})

console.log({} + +[] + {} + []); //  "[object Object]" + "0" + "[object Object]" + "" = "[object Object]0[object Object]"
// think of it as console.log({} + (+[]) + {} + [])
// unary operator performs first which means it is now console.log({} + 0 + {} + [])

/**
  + "1" // converts into number 1
  + {} // NaN
  + [] // 0

  ({}).toString() // "[object Object]"
  [].toString() // ""
 */
