/* -------------------------用例测试-------------------- */
function sayName(a, b, c) {
  return {
    name: this.name,
    a,
    b,
    c,
  };
}
const person = {
  name: 'ming',
};

const bi = sayName.myCall(person, 'eat', 'sleep', 'work');
console.log(bi); //{name: 'ming', a: 'eat', b: 'sleep', c: 'work'}

/* -------------------------用例测试2-------------------- */
function sayName2(title) {
  return {
    name: this.name,
    breed: this.breed,
    title,
  };
}
const doggy = {
  name: 'yoyi',
  breed: 'GSD',
};

const dog = sayName2.myCall(doggy, 'officer');
console.log(dog); //{name: 'yoyi', breed: 'GSD', title: 'officer'}

/* ------------------ Solution Code ---------------------------------------------------- */
Function.prototype.myCall = function (thisArg, ...args) {
  const symbol = Symbol();

  const context = Object(thisArg == undefined ? window : thisArg); // transform primitive value
  context[symbol] = this; //用symbol键存func. 🟡这个this指向的是调用myCall的sayName函数，不是指向person obj的

  const result = context[symbol](...args);

  delete context[symbol];

  return result;
};
