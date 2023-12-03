// This is a JavaScript Quiz from BFE.dev

var a = 1;

function func() {
  a = 2;
  console.log(a); // 2
  var a;
}

func();

console.log(a); // 1

if (!('b' in window)) {
  var b = 1;
}

console.log(b); // undefined
