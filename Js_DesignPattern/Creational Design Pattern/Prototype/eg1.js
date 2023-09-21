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

const car2 = Object.create(car);
car2.drive(); // Started Driving
car2.brake(); // Stopping the car
console.log(car2.numofWheels); //4
