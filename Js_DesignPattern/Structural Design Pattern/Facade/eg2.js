class Inventory {
  //initialize the amounts of shampoo, conditioner, and hair serums
  constructor() {
    this.orders = {
      shampoo: {
        amount: 20,
      },
      conditioner: {
        amount: 20,
      },
      'hair serum': {
        amount: 1000,
      },
    };
  }
  //check availability of products
  isAvailable({ productName, amount }) {
    return amount <= this.orders[productName].amount;
  }
}

class BuyingProduct extends Inventory {
  buyProduct(product) {
    let p;

    const isAvailable = this.isAvailable(product);
    const { productName, amount } = product;
    if (isAvailable) {
      p = new BuyProduct();
      // this.orders[productName].amount -= amount;
    } else p = new PreOrderProduct();

    return p.showMessage(product);
  }
}
class BuyProduct {
  //define it such that it returns a message
  showMessage({ productName, amount }) {
    console.log(
      `${amount} bottles of ${productName} are available. Click on "buy" to purchase them.`
    );
  }
}
class PreOrderProduct {
  //define it such that it returns a message
  showMessage({ productName, amount }) {
    console.log(
      `${amount} bottles of ${productName} are not available. You can Pre-order them on the next page.`
    );
  }
}

/** --------------------------- 用例测试 ------------------------------- **/
var customer = new BuyingProduct();
customer.buyProduct({ productName: 'shampoo', amount: 2 }); // 2 bottles of shampoo are available. Click on "buy" to purchase them.
customer.buyProduct({ productName: 'hair serum', amount: 2000 }); // 2000 bottles of hair serum are not available. You can Pre-order them on the next page.
