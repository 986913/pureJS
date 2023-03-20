/* 父类 */
class Person3 {
  constructor(name) {
    this.name = name;
  }
  say() {
    console.log('i am parent');
  }
}

/* 子类 */
class A extends Person3 {
  constructor(name) {
    super(name);
  }
  // say() {
  //   console.log(`I'm ${this.name}`);
  // }
}
class B extends Person3 {
  constructor(name) {
    super(name);
  }
  // 保持子类的开放性和灵活性， 面向接口编程， Js引用极少，了解即可
  say() {
    console.log(`I'm ${this.name}`);
  }
}

/* 实例 */
let a = new A('a');
let b = new B('b');
a.say();
b.say();
