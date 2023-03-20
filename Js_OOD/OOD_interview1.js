/*requirement：
    打车时，可以打专车或者快车， 任何车都有车牌号和名称
    不同车价格不同，快车1￥/mile  专车2￥/mile
    行程开始时，显示车辆信息
    行程结束时，显示打车金额（假定行程5mile）
    要求：画出UML类图， 用ES6语法写出该实例 
*/

class Car {
  constructor(number, title) {
    this.number = number;
    this.title = title;
  }
}

class FastCar extends Car {
  constructor(number, title) {
    super(number, title);
    this.price = 1;
  }
}

class ZhuaCar extends Car {
  constructor(number, title) {
    super(number, title);
    this.price = 2;
  }
}

class Trip {
  constructor(car) {
    this.car = car;
  }
  start() {
    console.log(
      `Trip start:  title ${this.car.title}, number: ${this.car.number}`
    );
  }
  end() {
    console.log(`Trip end, total price is  ${5 * this.car.price}`);
  }
}

let car = new FastCar(100, 'miata');
let trip = new Trip(car);
trip.start();
trip.end();
