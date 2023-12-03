// This is a JavaScript Quiz from BFE.dev

const func1 = () => console.log(1);

func1(); // 1

func2(); // 2

function func2() {
  console.log(2);
}

func3(); // Error

var func3 = function func4() {
  console.log(3);
};

/**
  func1 is normal execution

  We are able to execute func2 before declaring it because of hoisting.

  func3 is a Function Expression. Only declarations are hoisted and not initialization, 
  hence func3 is available but it is undefined before initialization. 
  When we try to run func3() it throws an error Uncaught TypeError: func3 is not a function
 */
