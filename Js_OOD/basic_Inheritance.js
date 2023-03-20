/* 父类 */
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  // eat, speak是公共方法，在父类中把公共方法提取出来能提高复用
  eat() {
    console.log(`${this.name} is eating`);
  }
  speak() {
    console.log(`my name is ${this.name}, age is ${this.age}`);
  }
}

/* 子类 */
class Student extends Person {
  // 继承
  constructor(name, age, number) {
    super(name, age);
    this.number = number;
  }
  study() {
    console.log(`${this.name} is a student, he's studing`);
  }
}

/* 实例 */
let xiaoming = new Student('ming', 20, 1000);
xiaoming.speak();
xiaoming.eat();
xiaoming.study();
