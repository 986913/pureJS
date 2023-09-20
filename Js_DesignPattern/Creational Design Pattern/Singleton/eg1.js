let instance = null;

class Printer {
  constructor(pages) {
    this.display = function () {
      console.log(
        `You are connected to the printer. You want to print ${pages} pages.`
      );
    };
  }

  static getInstance(numOfpages) {
    if (!instance) {
      instance = new Printer(numOfpages);
    }
    return instance;
  }
}

/** --------------------------- 用例测试 ------------------------------- **/
var obj1 = Printer.getInstance(2);
obj1.display(); // You are connected to the printer. You want to print 2 pages.

var obj2 = Printer.getInstance(3);
obj2.display(); // You are connected to the printer. You want to print 2 pages.

console.log(obj2 == obj1); // true
