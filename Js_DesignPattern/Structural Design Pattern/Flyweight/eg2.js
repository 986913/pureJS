class Dress {
  constructor(serialNumber, type, color, designer, availability) {
    this.serialNumber = serialNumber;
    this.type = type;
    this.color = color;
    this.designer = designer;
    this.availability = availability;
    this.price = 0;
  }
  dressPrice() {
    if (this.type == 'maxi') this.price = 1000;
    if (this.type == 'gown') this.price = 2000;
    if (this.type == 'skirt') this.price = 500;
    return this.price;
  }
}

class DressFactory {
  constructor() {
    this.existingDresses = {};
  }

  createDress(serialNumber, type, color, designer, availability) {
    const exists = this.existingDresses[serialNumber];

    if (!!exists) {
      return this.existingDresses[serialNumber];
    } else {
      const dress = new Dress(
        serialNumber,
        type,
        color,
        designer,
        availability
      );
      this.existingDresses[serialNumber] = dress;
      return dress;
    }
  }
}

/** --------------------------- 用例测试 ------------------------------- **/
const factory = new DressFactory();
const pinkdress1 = factory.createDress('#123', 'skirt', 'pink', 'Zara', 'yes');
const pinkdress2 = factory.createDress('#123', 'skirt', 'pink', 'Zara', 'yes');

console.log(pinkdress1 === pinkdress2); // true:  这是重点，返回same instance
console.log(pinkdress1.dressPrice()); // 500
console.log(pinkdress2.dressPrice()); // 500
