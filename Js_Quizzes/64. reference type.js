const obj = {
  msg: 'BFE',
  foo() {
    console.log(this.msg);
  },
  bar() {
    console.log('dev');
  },
};

/*  `foo` called as method of `obj` thus prints 'BFE' */
obj.foo(); // 'BFE'

/* Since there is no operator in parenthesis `()` thus it will return funciton
as it is therefore `(obj.foo)()===obj.foo()`. So it is same like above  */
obj.foo(); // 'BFE'

/* Here there are operators in parentheis, thus it will return `obj.foo` and change
it context environment from function to global. And there is no `msg` in
global environment, hence it will print `undefined` */
(obj.foo || obj.bar)(); // undefined
