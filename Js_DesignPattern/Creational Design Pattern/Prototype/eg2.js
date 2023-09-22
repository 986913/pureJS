//Define the Ninja class and write rest of the code here
const Ninja = function (name) {
  this.name = name;
  this.points = 100;
};

Ninja.prototype.punch = function (otherNinja) {
  if (otherNinja.points > 0 && this.points > 0) {
    otherNinja.points -= 20;
    return `${otherNinja.name}'s points are ${otherNinja.points}`;
  } else {
    return `Can't punch ${otherNinja.name}`;
  }
};
Ninja.prototype.kick = function (otherNinja) {
  if (otherNinja.points > 0 && this.points > 0) {
    otherNinja.points -= 50;
    return `${otherNinja.name}'s points are ${otherNinja.points}`;
  } else {
    return `Can't kick ${otherNinja.name}`;
  }
};

/** --------------------------- 用例测试 ------------------------------- **/
var ninja1 = new Ninja('Ninja1');
var ninja2 = new Ninja('Ninja2');
/* both the ninja1 and ninja2 instances refer to the same punch and kick functions, 
instead of having their copies of each. This makes the code more memory efficient. */
console.log(ninja1.kick === ninja2.kick); // true
console.log(ninja1.punch === ninja2.punch); //true

ninja1.kick(ninja2); // "Ninja2's points are 50"
ninja2.punch(ninja1); // "Ninja1's points are 80"
ninja1.kick(ninja2); // "Ninja2's points are 0"
ninja1.punch(ninja2); //"Can't punch Ninja2"
ninja2.kick(ninja1); // "Can't kick Ninja1"
