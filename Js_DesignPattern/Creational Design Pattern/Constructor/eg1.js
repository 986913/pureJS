/* ES5 function based constructor */
function Human(name, age, occupation) {
  //defining properties inside the constructor function, constructor initializing the property values upon object creation
  this.name = name;
  this.age = age;
  this.occupation = occupation;
  //defining a method inside the constructor function
  this.describe = function () {
    console.log(`${this.name} is a ${this.age}-year-old ${this.occupation}`);
  };
}
//creating a "person" object using the Human constructor
//the constructor uses the arguments passed into it to initialize the property values name, age and sex
var person = new Human('Elle', '23', 'Engineer');
person.describe();

/* ES6 class based constructor */
class Human {
  constructor(name, age, occupation) {
    this.name = name;
    this.age = age;
    this.occupation = occupation;
  }
  describe() {
    console.log(`${this.name} is a ${this.age}-year-old ${this.occupation}`);
  }
}
