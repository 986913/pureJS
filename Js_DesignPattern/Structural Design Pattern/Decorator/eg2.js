class Circle {
  draw() {
    console.log('画一个圆形');
  }
}

class Decorator {
  constructor(circle) {
    this.circle = circle;
  }
  draw() {
    this.circle.draw();
    this.setRedBorder();
    this.setRedColor();
  }
  setRedBorder() {
    console.log('设置红色边框');
  }
  setRedColor() {
    console.log('设置红色内容');
  }
}

/** --------------------------- 用例测试 ------------------------------- **/
let circle = new Circle();
let circle2 = new Decorator(circle); // 传入instance obj
circle2.draw(); // 画一个圆形,设置红色边框，设置红色内容
