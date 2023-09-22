var car = {
  drive() {
    console.log('Started Driving');
  },
  brake() {
    console.log('Stopping the car');
  },
  numofWheels: 4,
};

/** --------------------------- 用例测试 ------------------------------- **/

//  Object.create takes an object as a parameter (car in our case) and returns an object whose prototype property points to this object (car).
const car1 = Object.create(car);
car1.drive(); // Started Driving
car1.brake(); // Stopping the car
console.log(car1.numofWheels); // 4
console.log(car1.__proto__ == car); // true

//defining the extra property color with value red
const car2 = Object.create(car, { color: { value: 'red' } });
console.log(car2.color); // red
