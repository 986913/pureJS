let orderNumber = 0;

class PlaceFoodOrder {
  placeOrder(orderDetails) {
    const orderId = PlaceFoodOrder.generateId();
    let chef;
    if (orderDetails.foodType === 'Main Course') {
      chef = new MainCourseChef();
    } else if (orderDetails.foodType == 'Dessert') {
      chef = new DessertChef();
    }
    return chef.addFoodOrder({ orderId, orderDetails });
  }

  static generateId() {
    return ++orderNumber;
  }
}

class FoodOrders {
  constructor() {
    this.orders = [];
  }
  addFoodOrder(order) {
    this.orders.push(order);
    return this.conveyOrder(order);
  }

  timetoMakeOrder() {}
  conveyOrder(order) {}
}
class MainCourseChef extends FoodOrders {
  constructor() {
    super();
    this.assigned = true;
    return this;
  }
  timetoMakeOrder() {
    return Math.floor(Math.random() * 50) + 10;
  }
  conveyOrder({ orderId, orderDetails }) {
    const time = this.timetoMakeOrder();
    console.log(
      `Order number ${orderId}: ${orderDetails.foodDetails} will be served in ${time} minutes.`
    );
  }
}
class DessertChef extends FoodOrders {
  constructor() {
    super();
    this.assigned = true;
    return this;
  }
  timetoMakeOrder() {
    return Math.floor(Math.random() * 30) + 10;
  }
  conveyOrder({ orderId, orderDetails }) {
    const time = this.timetoMakeOrder();
    console.log(
      `Order number ${orderId}: ${orderDetails.foodDetails} will be served in ${time} minutes.`
    );
  }
}

/** --------------------------- 用例测试 ------------------------------- **/
// Facade: For the customer, the process is simple: just place an order and receive the approximate time for getting served. However, there is a lot that happens in the background from the moment the order is placed.
const customer = new PlaceFoodOrder();
const order1 = customer.placeOrder({
  foodType: 'Main Course',
  foodDetails: 'Pasta with Shrimps',
}); // Order number 1: Pasta with Shrimps will be served in 36 minutes.
const order2 = customer.placeOrder({
  foodType: 'Dessert',
  foodDetails: 'Molten Lava Cake',
}); // Order number 2: Molten Lava Cake will be served in 12 minutes.
