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

/* ------------------ Solution Code ---------------------------------------------------- */

Function.prototype.myApply = function (obj, boundArgs) {
  // console.log(this) //🟡这个this指向的是调用myBind的sayName函数，不是指向person obj的

  obj.originalFn = this; //相当于给obj添加了一个originalFn函数，并且函数就是myCall的调用者:sayName

  if (!boundArgs) {
    result = obj.originalFn();
  } else {
    //newArgs存为：["boundArgs[0]", "boundArgs[1]", "boundArgs[2]"]  --> 为下面的eval使用
    let newArgs = Array.from(boundArgs).map(
      (arg, index) => `boundArgs[${index}]`
    );

    // result = eval( obj.originalFn(boundArgs[0],boundArgs[1],boundArgs[2])"  )
    result = eval('obj.originalFn(' + newArgs + ')');
  }

  delete obj.originalFn; // 删掉刚加的originalFn属性

  return result;
};
