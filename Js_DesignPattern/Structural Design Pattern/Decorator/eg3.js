class SuperHero {
  constructor(name, power) {
    this.name = name;
    this.power = power;
  }
}

function SuperHeroWithSword(superhero) {
  superhero.sword = true;
  superhero.hasSword = function () {
    return `${this.name}'s power is ${this.power}, and he also has a sword now.`;
  };
  return superhero;
}
function SuperHeroWithSuperSpeed(superhero) {
  superhero.superSpeed = true;
  superhero.hasSuperSpeed = function () {
    return `${this.name}'s power is ${this.power}, and he also has the super speed now.`;
  };
  return superhero;
}
function SuperHeroWithSpeedandSword(superhero) {
  superhero.speedAndSword = true;

  superhero.hasSpeedAndSword = function () {
    return `${this.name}'s power is ${this.power}, and he also has both super speed and a sword now.`;
  };
  return superhero;
}

/** --------------------------- 用例测试 ------------------------------- **/
var superhero1 = new SuperHero('Fire Man', 'Fire');
var superhero2 = new SuperHero('Ice Man', 'Ice');

SuperHeroWithSword(superhero1); // 传入instance obj
console.log(superhero1.hasSword()); // Fire Man's power is Fire, and he also has a sword now.

SuperHeroWithSuperSpeed(superhero1); // 传入instance obj
console.log(superhero1.hasSuperSpeed()); // Fire Man's power is Fire, and he also has the super speed now.

SuperHeroWithSpeedandSword(superhero2); // 传入instance obj
console.log(superhero2.hasSpeedAndSword()); // Ice Man's power is Ice, and he also has both super speed and a sword now.
