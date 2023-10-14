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
  /* accept visitor,  
    the bookshop introduces a discount on the books that cost more than 50 dollars.
    Hence, we want to perform an additional operation of visiting the books and implementing the discount on them. 
    Here, we use the visitor pattern. We introduce a visitor that will visit the books and update their prices. 
    However, the book objects should have a function that allows the visitor to visit them and perform the operation. 
    For this purpose, we have defined the accept method in our Book class
  */
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
