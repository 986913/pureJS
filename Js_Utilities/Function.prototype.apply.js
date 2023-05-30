/* -------------------------用例测试1-------------------- */
function sayName() {
  console.log(this.name);
}
const person = {
  name: 'ming',
};
sayName.myApply(person); // ''ming

/* -------------------------用例测试2-------------------- */
function sayName(a, b, c) {
  console.log(this.name);
  console.log('params', a, b, c);
  return {
    name: this.name,
    a,
    b,
    c,
  };
}
const person2 = {
  name: 'ming',
};

sayName.myApply(person2, ['eat', 'sleep', 'work']);
/* 
  "ming"
  "params", "eat", "sleep", "work" 
*/

const bi = sayName.myApply(person2, ['eat', 'sleep', 'work']);
console.log(bi);
/* 
  "ming"
  "params", "eat", "sleep", "work" 
  {
    a: "eat",
    b: "sleep",
    c: "work",
    name: "ming"
  }
*/

/* ------------------ Solution: same as call just the args is an array -------------------------------- */
Function.prototype.myApply = function (thisArg, args) {
  // you tie a function into an object(context) as if it belonged to the object
  const symbol = Symbol(); // create unique key

  context = Object(thisArg == undefined ? window : thisArg); // set context to windows if null and Create an object to handle primitive value
  context[symbol] = this; // 'this' points to the calling function here 🟡this指向的是调用myBind的sayName函数，不是指向person obj的

  const result = context[symbol](...args); // call the function

  delete context[symbol]; // delete the unique key

  return result; // return result
};
