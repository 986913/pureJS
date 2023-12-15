// This is a JavaScript Quiz from BFE.dev

var a = 1;
(function () {
  console.log(a + this.a); // undefined + 1 = NaN
  ('21');
  var a = '2';
  console.log(a + this.a); // undefined + 1 = NaN
})();

var name = 1; // implicitly coerced to string "1"
(function () {
  console.log(name + this.name); // undefined + "1" = "undefined1"

  var name = '2';
  console.log(name + this.name); // "2" + "1" = "21"
})();

/**
  name is a special case such that when you are using the variable named name in the global scope it is treated as window.name 
  In Google Chrome, window.name gets the value as a string.
    var name = 1; // this is converted using toString() 
    console.log(typeof name) // "string" 
 */
