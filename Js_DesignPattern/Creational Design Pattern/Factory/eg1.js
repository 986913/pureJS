/* 你去买肉夹馍，直接点餐取餐，不会自己亲手做， 快餐店要封装做肉夹馍的工作，做好直接给买者 */

class Creator {
  create(name) {
    return new Product(name); // 将new操作单独封装
  }
}

class Product {
  constructor(name) {
    this.name = name;
  }
  init() {
    console.log(`you chose the ${this.name} product`);
  }
}

/** --------------------------- 用例测试 ------------------------------- **/
let creator = new Creator(); // 用的时候只知道Creator能生成实例就行了，没必要知道Product这个class

// NOTE: use p, not creator.  cuz instance returned within create function
let p = creator.create('roujiamo');
p.init(); // you chose the roujimo product
