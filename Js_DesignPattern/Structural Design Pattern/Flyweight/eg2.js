class Dress {
  constructor(serialNumber, type, color, designer, availability) {
    this.serialNumber = serialNumber;
    this.type = type;
    this.color = color;
    this.designer = designer;
    this.availability = availability;
    this.price = 0;
  }
  dressPrice() {}
}

class Skirt extends Dress {
  constructor(serialNumber, type, color, designer, availability) {
    super(serialNumber, type, color, designer, availability);
    this.price = 500;
  }
  dressPrice() {
    return this.price;
  }
}
class Gown extends Dress {
  constructor(serialNumber, type, color, designer, availability) {
    super(serialNumber, type, color, designer, availability);
    this.price = 2000;
  }
  dressPrice() {
    return this.price;
  }
}
class Maxi extends Dress {
  constructor(serialNumber, type, color, designer, availability) {
    super(serialNumber, type, color, designer, availability);
    this.price = 1000;
  }
  dressPrice() {
    return this.price;
  }
}
class DressFactory {
  constructor() {
    this.dressMap = new Map();
  }
  createDress(serialNumber, type, color, designer, availability) {
    let dress = this.dressMap.get(type);
    if (!dress) {
      switch (type) {
        case 'skirt':
          dress = new Skirt(serialNumber, type, color, designer, availability);
          break;
        case 'gown':
          dress = new Gown(serialNumber, type, color, designer, availability);
          break;
        case 'maxi':
          dress = new Maxi(serialNumber, type, color, designer, availability);
          break;
      }
      this.dressMap.set(type, dress);
    }
    return dress;
  }
}
/** --------------------------- 用例测试 ------------------------------- **/
const factory = new DressFactory();
const pinkdress1 = factory.createDress('#123', 'skirt', 'pink', 'Zara', 'yes');
const pinkdress2 = factory.createDress('#123', 'skirt', 'pink', 'Zara', 'yes');

console.log(pinkdress1 === pinkdress2); // true:  这是重点，返回same instance
console.log(pinkdress1.dressPrice()); // 500
console.log(pinkdress2.dressPrice()); // 500
