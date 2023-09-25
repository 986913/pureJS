class FrozenYoghurt {
  constructor(flavor, price) {
    this.flavor = flavor;
    this.price = price;
  }
  orderPlaced() {
    console.log(
      `The ${this.flavor} flavor will cost you ${this.price} dollars`
    );
  }
}

// decorator 1
function addFlavors(froyo) {
  froyo.addStrawberry = true;
  froyo.addVanilla = true;
  froyo.price += 20;
  froyo.updatedInfo = function () {
    console.log(
      `The updated price after adding flavors is ${froyo.price} dollars`
    );
  };
  return froyo;
}
// decorator 2
function addToppings(froyo) {
  froyo.hasSprinkles = true;
  froyo.hasBrownie = true;
  froyo.hasWafers = true;
  froyo.allToppings = function () {
    console.log('Your froyo has sprinkles, brownie, and wafers');
  };
  return froyo;
}

/** --------------------------- 用例测试 ------------------------------- **/
const froyo = new FrozenYoghurt('chocolate', 10);
froyo.orderPlaced(); // The chocolate flavor will cost you 10 dollars

//using decorators:
var froyowithFlavors = addFlavors(froyo); // 传入instance obj
froyowithFlavors.updatedInfo(); // The updated price after adding flavors is 30 dollars
//using decorators:
var froyoWithToppings = addToppings(froyo); // 传入instance obj
froyoWithToppings.allToppings(); //  froyo has sprinkles, brownie, and wafers

console.log(froyo === froyoWithToppings); // true
console.log(froyo === froyowithFlavors); // true
