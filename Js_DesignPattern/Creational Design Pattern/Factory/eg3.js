class ToyFactory {
  createToy(toy) {
    if (toy.toyType === 'duck') return new ToyDuck(toy);
    else if (toy.toyType === 'car') return new ToyCar(toy);
  }
}

class ToyDuck {
  constructor({ color, price, name }) {
    this.color = color;
    this.price = price;
  }
}
class ToyCar {
  constructor({ color, price, name }) {
    this.color = color;
    this.price = price;
    this.name = name;
  }
}
/** --------------------------- 用例测试 ------------------------------- **/
const toy = new ToyFactory();

// NOTE: use cartoy,ducktoy, not toy. cuz instance return within ToyFactory function
const cartoy = toy.createToy({
  toyType: 'car',
  color: 'blue',
  price: 12,
  name: 'honda',
});
const ducktoy = toy.createToy({
  toyType: 'duck',
  color: 'whilte',
  price: 1,
});
console.log(cartoy); // ToyCar { color: 'blue', price: 12, name: 'honda' }
console.log(ducktoy); // ToyDuck { color: 'white', price: 1 }
