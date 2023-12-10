// This is a JavaScript Quiz from BFE.dev

var foo = 1;
(function () {
  console.log(foo); // undefined
  foo = 2;
  console.log(window.foo); //1
  console.log(foo); //2
  var foo = 3;
  console.log(foo); // 3
  console.log(window.foo); // 1
})();
