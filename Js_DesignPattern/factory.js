class Product {
  constructor(name) {
    this.name = name;
  }
  init() {
    console.log('init');
  }
  fn1() {
    console.log('fn1');
  }
  fn2() {
    console.log('fn2');
  }
}

class Creator {
  create(name) {
    return new Product(name); // 将new操作单独封装
  }
}

//测试：用的时候只知道Creator能生成实例就行了，没必要知道Product这个class
let creator = new Creator();
let p = creator.create('roujiamo');
p.init();
p.fn1();
p.fn2();
