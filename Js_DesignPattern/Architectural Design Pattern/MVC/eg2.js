class ShoppingCartModel {
  constructor(itemNumber, itemName, itemQuantity, itemPrice) {
    this.itemName = itemName;
    this.itemQuantity = itemQuantity;
    this.itemPrice = itemPrice;
    this.itemNumber = itemNumber;
  }

  getItemName() {
    return this.itemName;
  }

  getItemQuantity() {
    return this.itemQuantity;
  }

  getItemPrice() {
    return this.itemPrice;
  }

  getItemNumber() {
    return this.itemNumber;
  }
}

class ShoppingCartView {
  constructor() {
    this.controller = null;
  }
  registerWith(controller) {
    this.controller = controller;
    this.controller.addView(this);
  }

  displayItem(itemNumber, itemName, itemQuantity, itemPrice) {
    console.log(
      `Item Number: ${itemNumber}\nItem: ${itemName}\nQuantity: ${itemQuantity}\nPrice: ${itemPrice}`
    );
  }

  buyItem(itemNumber, itemName, itemQuantity, itemPrice) {
    this.controller.buyItem(itemNumber, itemName, itemQuantity, itemPrice);
  }

  changeItemQuantity(itemNumber, newQuantity) {
    this.controller.setItemQuantity(itemNumber, newQuantity);
  }
}

class ShoppingCartController {
  constructor() {
    this.model = null;
    this.view = null;
    this.itemList = [];
  }

  addView(view) {
    this.view = view;
  }
  addModel(model) {
    this.model = model;
  }
  setItemQuantity(itemNumber, newQuantity) {
    if (this.itemList[itemNumber]) {
      this.itemList[itemNumber].itemQuantity = newQuantity;
      this.updateView();
    }
  }

  updateView() {
    for (let i in this.itemList)
      this.view.displayItem(
        this.itemList[i].getItemNumber(),
        this.itemList[i].getItemName(),
        this.itemList[i].getItemQuantity(),
        this.itemList[i].getItemPrice()
      );
  }
  buyItem(itemName, itemQuantity, itemPrice) {
    this.itemList.push(
      new ShoppingCartModel(
        this.itemList.length,
        itemName,
        itemQuantity,
        itemPrice
      )
    );
    this.updateView();
  }
}

/** --------------------------- 用例测试 ------------------------------- **/
const view = new ShoppingCartView();
const controller = new ShoppingCartController();
view.registerWith(controller);

view.buyItem('Popcorn', 3, 2.5);
/**
  Item Number: 0
  Item: Popcorn
  Quantity: 3
  Price: 2.5
 */

view.buyItem('Soap', 5, 10.0);
/**
  Item Number: 0
  Item: Popcorn
  Quantity: 3
  Price: 2.5
  Item Number: 1
  Item: Soap
  Quantity: 5
  Price: 10
 */
view.changeItemQuantity(0, 6);
/**
  Item Number: 0
  Item: Popcorn
  Quantity: 6
  Price: 2.5
  Item Number: 1
  Item: Soap
  Quantity: 5
  Price: 10
 */
