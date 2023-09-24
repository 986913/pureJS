function JunkFoodFactory() {
  var junkfood;
  this.createJunkFood = function (name, type, price) {
    switch (name) {
      case 'chips':
        junkfood = new Chips(name, type, price);
        break;
      case 'soda':
        junkfood = new Soda(name, type, price);
        break;
      default:
        junkfood = new Chips(name, type, price);
        break;
    }
    return junkfood;
  };
}

function Soda(name, type, price) {
  this.name = name;
  this.type = type;
  this.price = price;
  this.display = function () {
    console.log(`The ${this.type} ${this.name} costs ${this.price} dollars`);
  };
}
function Chips(name, type, price) {
  this.name = name;
  this.type = type;
  this.price = price;
  this.display = function () {
    console.log(`The ${this.type} ${this.name} costs ${this.price} dollars`);
  };
}

/** --------------------------- 用例测试 ------------------------------- **/
var factory = new JunkFoodFactory();
var chips = factory.createJunkFood('chips', 'potato', 1.5);
chips.display(); // The potato chips costs 1.5 dollars

chips = factory.createJunkFood('chips', 'corn', 2.5);
chips.display(); // The corn chips costs 2.5 dollars

var soda = factory.createJunkFood('soda', 'Energy Drink', 10);
soda.display(); // The Energy Drink soda costs 10 dollars

soda = factory.createJunkFood('soda', 'Cola', 7);
soda.display(); // The Cola soda costs 7 dollars
