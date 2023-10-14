class Visitor {
  visit(item) {}
}

class BookVisitor extends Visitor {
  // visit element
  visit(book) {
    let cost = 0;
    if (book.getPrice() > 50) cost = book.getPrice() * 0.5;
    else cost = book.getPrice();

    console.log(
      `Book name: ${book.getName()}
        ID: ${book.getID()}
        cost: ${cost}
      `
    );
    return cost;
  }
}

class Book {
  constructor(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
  getPrice() {
    return this.price;
  }
  getName() {
    return this.name;
  }
  getID() {
    return this.id;
  }
  // accept visitor
  accept(visitor) {
    return visitor.visit(this);
  }
}

/** --------------------------- 用例测试 ------------------------------- **/
const visitor = new BookVisitor();
const book1 = new Book('#1234', 'lordOftheRings', 80);
book1.accept(visitor);
/**
  Book name: lordOftheRings
    ID: #1234
    cost: 40
 */
