/* 父类 */
class Person2 {
  name;
  age;
  protected weight; //定义protected属性,对自己和子类开放
  constructor(name, age) {
    this.name = name; // public 属性
    this.age = age; // public 属性
    this.weight = 120;
  }
  eat() {
    console.log(`${this.name} is eating`);
  }
  speak() {
    console.log(`my name is ${this.name}, age is ${this.age}`);
  }
}

/* 子类 */
class Student2 extends Person2 {
  number;
  private girlfiriend; //定义private属性, 不能被外部访问
  constructor(name, age, number) {
    super(name, age);
    this.number = number;
    this.girlfiriend = "xiao mei";
  }
  study() {
    console.log(`${this.name} is a student, he's studing`);
  }
  getWeight() {
    console.log(`weight: ${this.weight}`);
  }
}

/* 实例 */
let xiaoming2 = new Student2("ming", 20, "a1");
console.log(xiaoming2.getWeight());
// console.log(xiaoming.weight);  //会编译出错
// console.log(xiaoming.girlfiriend);//会编译出错
