class IceCreamFactory {
  constructor() {
    this.createIcecream = function (flavor) {
      let iceCream;
      /* 将new操作单独封装 */
      if (flavor === 'chocolate') iceCream = new Chocolate();
      else if (flavor === 'mint') iceCream = new Mint();
      else if (flavor === 'strawberry') iceCream = new Strawberry();
      return iceCream;
    };
  }
}

class Chocolate {
  constructor() {
    this.icecreamFlavor = 'chocolate';
    this.message = function () {
      return `You chose the ${this.icecreamFlavor} flavor.`;
    };
  }
}
class Mint {
  constructor() {
    this.icecreamFlavor = 'mint';
    this.message = function () {
      return `You chose the ${this.icecreamFlavor} flavor.`;
    };
  }
}

/** --------------------------- 用例测试 ------------------------------- **/
const iceCreamfactory = new IceCreamFactory();

// NOTE: use chocolate,mint, not iceCreamfactory, cuz instance returned within createIcecream function
const chocolate = iceCreamfactory.createIcecream('chocolate');
const mint = iceCreamfactory.createIcecream('mint');
console.log(chocolate.message()); // You chose the chocolate flavor.
console.log(mint.message()); // You chose the mint flavor..s
