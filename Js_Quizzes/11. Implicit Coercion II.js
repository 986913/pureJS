// This is a JavaScript Quiz from BFE.dev
console.log([] + []); // "" + "" = ""

console.log([] + 1); // "" + "1" = "1"

console.log([[]] + 1); // "" + "1" = "1"

console.log([[1]] + 1); // "1" + "1" = "11"

console.log([[[[2]]]] + 1); // "2" + "1" = "21"

console.log([] - 1); // 0 - 1 = -1

console.log([[]] - 1); // 0 - 1 = -1

console.log([[1]] - 1); // 1 - 1 = 0

console.log([[[[2]]]] - 1); // 2 - 1 = 1

console.log([] + {}); // "" +  "[object Object]" = "[object Object]"

console.log({} + {}); // "[object Object]" + "[object Object]" = "[object Object][object Object]"

console.log({} - {}); // NaN + NaN = NaN

/**
  知识点：
    [].toString(); // ""
    [1].toString(); // "1" returns the number irrespective of how nested it is
    ({}).toString(); // [object Object]

    Number([]); // 0
    Number([1]); // 1 returns the number irrespective of how nested it is
    Number({}); // NaN
 */
