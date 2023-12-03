var a = 1;
function a() {}

console.log(typeof a); // "number"

var b;
function b() {}
b = 1;

console.log(typeof b); // "number"

function c() {}
var c = 1;

console.log(typeof c); // "number"

var d = 1;

(function () {
  d = '2';
  console.log(typeof d); // "string"
  function d() {}
})();

console.log(typeof d); // "number"

var e = 1;
const f = function e() {}; //e is a named function expression but this name is then local only to the function body (scope). Thus, outside the expression body e is still 1 i.e. "number"s

console.log(typeof e); // "number"
